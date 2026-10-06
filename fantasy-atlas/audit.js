// 상호작용 가시성 검사: 각 상호작용을 가상 시간으로 돌려 움직이는 부품의 위치를 모으고,
// 8방향 카메라에서 지형·건물에 가려지는지, 안개 속인지, 이름이 틀린 부품·조명이 있는지 본다.
const fs = require('fs'), vm = require('vm'), path = require('path');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
class BG { setAttribute(k, a) { this.attributes = this.attributes || {}; this.attributes[k] = a; } setIndex(i) { this.index = i; } computeBoundingSphere() {} }
const THREE = { Color, BufferGeometry: BG, Float32BufferAttribute: function (a) { this.count = a.length / 3; }, BufferAttribute: function (a, n) { this.array = a; this.count = a.length / n; } };
const ctx = { THREE, console, Math, Map, Set, Promise }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js');
for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
let { W, D, H } = ctx.VX;
const only = process.argv[2];
const verbose = process.argv.includes('-v');
const YAWS = [0, 1, 2, 3, 4, 5, 6, 7].map(k => k * Math.PI / 4);

const flush = () => new Promise(r => setImmediate(r));
const clone = s => ({ off: s.off.slice(), rot: s.rot.slice(), scl: s.scl.slice() });
const lerp3 = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

async function dryRun(act, props, lightNames) {
  const propNames = Object.keys(props);
  let now = 0;
  const timers = [], st = {}, rec = { samples: {}, spins: new Set(), flashes: [], bursts: [], glow: false, missing: new Set(), missLights: new Set(), dur: 0 };
  propNames.forEach(n => { const o = props[n].o; st[n] = { off: (o.off0 || [0, 0, 0]).slice(), rot: (o.rot0 || [0, 0, 0]).slice(), scl: [1, 1, 1] }; rec.samples[n] = []; });
  rec.init = st;
  const later = s => new Promise(r => timers.push({ t: now + s, r }));
  const A = {
    wait: s => later(s),
    tween(name, to, dur) {
      const p = st[name];
      if (!p) { rec.missing.add(name); return Promise.resolve(); }
      const from = clone(p), end = { off: to.off || from.off, rot: to.rot || from.rot, scl: to.scl || from.scl };
      for (const t of [0, 0.25, 0.5, 0.75, 1]) rec.samples[name].push({ off: lerp3(from.off, end.off, t), rot: lerp3(from.rot, end.rot, t), scl: lerp3(from.scl, end.scl, t) });
      return later(dur || 1).then(() => { if (to.off) p.off = to.off.slice(); if (to.rot) p.rot = to.rot.slice(); if (to.scl) p.scl = to.scl.slice(); });
    },
    move(n, off, d) { return A.tween(n, { off }, d); },
    turn(n, rot, d) { return A.tween(n, { rot }, d); },
    respawn(n, d) { const p = st[n]; if (!p) { rec.missing.add(n); return later(d || 0.9); } const o = props[n].o; p.off = (o.off0 || [0, 0, 0]).slice(); p.rot = (o.rot0 || [0, 0, 0]).slice(); p.scl = [1, 1, 1]; rec.samples[n].push(clone(p)); return later(d || 0.9); },
    unwind(n) { const p = st[n]; if (p) for (let q = 0; q < 3; q++) p.rot[q] = ((p.rot[q] + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; },
    rope(n, l0, l, d) { return A.tween(n, { scl: [1, l / l0, 1] }, d); },
    async path(n, pts, dur) {
      const p = st[n]; if (!p) { rec.missing.add(n); return; }
      let last = p.off.slice(), total = 0;
      const segs = pts.map(q => { const l = Math.hypot(q[0] - last[0], q[1] - last[1], q[2] - last[2]); last = q; total += l; return l; });
      for (let k = 0; k < pts.length; k++) await A.tween(n, { off: pts[k].slice(0, 3), rot: pts[k][3] != null ? [0, pts[k][3], 0] : undefined }, dur * segs[k] / (total || 1));
    },
    spin(n, mul, d) { if (!st[n]) rec.missing.add(n); else rec.spins.add(n); return later(d); },
    flash(n, mul, d) { rec.flashes.push(n); if (n != null && !lightNames.has(n)) rec.missLights.add(n); return later(d); },
    burst(p, o) { rec.bursts.push(p.slice()); },
    glow(m, d) { rec.glow = true; return later(d); },
    lightning() { rec.glow = true; },
    wind(m, d) { rec.glow = true; return later(d); },
  };
  let done = false, err = null;
  Promise.resolve().then(() => act.run(A)).then(() => { done = true; }, e => { err = e; done = true; });
  for (let guard = 0; guard < 5000; guard++) {
    await flush();
    if (done) break;
    if (!timers.length) break;
    timers.sort((a, b) => a.t - b.t);
    const tm = timers.shift(); now = tm.t; tm.r();
  }
  // 남은 타이머(동시에 돌던 flash 등)는 무시
  rec.dur = now; rec.err = err; rec.hung = !done;
  return rec;
}

// Euler XYZ (three.js 기본): v' = Rx * Ry * Rz * v
function rotXYZ(v, r) {
  let [x, y, z] = v;
  let c = Math.cos(r[2]), s = Math.sin(r[2]); [x, y] = [x * c - y * s, x * s + y * c];
  c = Math.cos(r[1]); s = Math.sin(r[1]); [x, z] = [x * c + z * s, -x * s + z * c];
  c = Math.cos(r[0]); s = Math.sin(r[0]); [y, z] = [y * c - z * s, y * s + z * c];
  return [x, y, z];
}
const AXI = { x: 0, y: 1, z: 2 };

function surfaceVoxels(pw) {
  const out = [];
  for (const [i] of pw.data) {
    const x = i % W, z = Math.floor(i / W) % D, y = Math.floor(i / (W * D));
    if (!pw.get(x + 1, y, z) || !pw.get(x - 1, y, z) || !pw.get(x, y + 1, z) || !pw.get(x, y - 1, z) || !pw.get(x, y, z + 1) || !pw.get(x, y, z - 1)) out.push([x + 0.5, y + 0.5, z + 0.5]);
  }
  return out;
}
function subsample(arr, n) { if (arr.length <= n) return arr; const out = [], step = arr.length / n; for (let k = 0; k < n; k++) out.push(arr[Math.floor(k * step)]); return out; }

function makeOcc(w, staticProps) {
  // 1: 블록, 2: 액체(아래쪽)
  const occ = new Uint8Array(W * D * H);
  for (let i = 0; i < occ.length; i++) if (w.data[i]) occ[i] = 1;
  for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const lv = w.liq[x + W * z]; if (lv >= 0) for (let y = 0; y <= lv; y++) { const i = x + W * (z + D * y); if (!occ[i]) occ[i] = 2; } }
  for (const pw of staticProps) for (const [i] of pw.data) if (!occ[i]) occ[i] = 3;
  return occ;
}
// p에서 카메라 쪽 d 방향으로 복셀 DDA. 가리는 것이 있으면 그 종류를 돌려준다
function march(occ, p, d, selfSet) {
  let x = Math.floor(p[0]), y = Math.floor(p[1]), z = Math.floor(p[2]);
  if (x >= 0 && y >= 0 && z >= 0 && x < W && y < H && z < D) {
    const i0 = x + W * (z + D * y);
    if (occ[i0] && !(selfSet && selfSet.has(i0))) return occ[i0];
  }
  const sx = Math.sign(d[0]), sy = Math.sign(d[1]), sz = Math.sign(d[2]);
  const tdx = sx ? Math.abs(1 / d[0]) : Infinity, tdy = sy ? Math.abs(1 / d[1]) : Infinity, tdz = sz ? Math.abs(1 / d[2]) : Infinity;
  let tx = sx ? ((sx > 0 ? x + 1 - p[0] : p[0] - x) * tdx) : Infinity;
  let ty = sy ? ((sy > 0 ? y + 1 - p[1] : p[1] - y) * tdy) : Infinity;
  let tz = sz ? ((sz > 0 ? z + 1 - p[2] : p[2] - z) * tdz) : Infinity;
  for (let n = 0; n < 600; n++) {
    if (tx < ty && tx < tz) { x += sx; tx += tdx; } else if (ty < tz) { y += sy; ty += tdy; } else { z += sz; tz += tdz; }
    if (y >= H || y < 0 || x < 0 || x >= W || z < 0 || z >= D) return 0;
    const i = x + W * (z + D * y);
    if (occ[i] && !(selfSet && selfSet.has(i))) return occ[i];
  }
  return 0;
}
const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
function fogAt(def, base, p) {
  const f = def.fog || {};
  const box = f.box || [W / 2, D / 2, W / 2, D / 2];
  const qx = Math.abs(p[0] - box[0]) / box[2], qz = Math.abs(p[2] - box[1]) / box[3];
  const e2 = Math.pow(qx ** 4 + qz ** 4, 0.25);
  let fo = smooth(f.start != null ? f.start : 0.74, 1, e2);
  const floor = (f.floor != null ? f.floor : base - 8), depth = f.depth || 10;
  fo = Math.max(fo, smooth(floor, floor - depth, p[1]));
  return fo;
}

(async () => {
  const report = [];
  for (const m of ctx.MAPS) {
    if (only && m.id !== only && m.cat !== only) continue;
    const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base || 24; W = w.W; D = w.D; H = w.H;
    const info = m.build(w) || {};
    const base = w.base, pitch = m.pitch || 0.6;
    const props = {}; (w.props || []).forEach((pr, k) => { props[pr.o.name || ('p' + k)] = pr; });
    const lights = (info.lights || []).slice().sort((p1, p2) => ((p2.name ? 1 : 0) - (p1.name ? 1 : 0)) || (p2.i * p2.d - p1.i * p1.d)).slice(0, 16);
    const lightNames = new Set(lights.filter(l => l.name).map(l => l.name));
    const allLightNames = new Set((info.lights || []).filter(l => l.name).map(l => l.name));
    const nightLights = new Set(lights.filter(l => l.name && l.night).map(l => l.name));
    console.log(`\n■ ${m.cat}/${m.id} ${m.name}`);
    for (const a of (info.acts || [])) {
      const rec = await dryRun(a, props, lightNames);
      const moved = Object.keys(rec.samples).filter(n => rec.samples[n].length || rec.spins.has(n));
      const occ = makeOcc(w, Object.keys(props).filter(n => !moved.includes(n)).map(n => props[n].w));
      const pts = []; // {p, prop}
      let maxDisp = 0, nVox = 0;
      const ext = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
      for (const n of moved) {
        const pr = props[n], o = pr.o, pv = o.pivot || [W / 2, base, D / 2];
        const surf = surfaceVoxels(pr.w); nVox += pr.w.data.size;
        const vox = subsample(surf, 80);
        const off0 = o.off0 || [0, 0, 0], rot0 = o.rot0 || [0, 0, 0];
        let states = rec.samples[n].slice();
        if (!states.length) states = [{ off: off0.slice(), rot: rot0.slice(), scl: [1, 1, 1] }];
        if (rec.spins.has(n) || o.speed) { const ax = AXI[o.axis || 'y']; const extra = []; for (const s of states.slice(0, 1)) for (const ang of [0.8, 1.6, 2.4]) { const r = s.rot.slice(); r[ax] += ang; extra.push({ off: s.off, rot: r, scl: s.scl }); } states = states.concat(extra); }
        let restP = null;
        for (const s of states) {
          const off = s.off, rot = s.rot, cur = [];
          vox.forEach((v, k) => {
            const l = [(v[0] - pv[0]) * s.scl[0], (v[1] - pv[1]) * s.scl[1], (v[2] - pv[2]) * s.scl[2]];
            const r = rotXYZ(l, rot);
            const P = [pv[0] + off[0] + r[0], pv[1] + off[1] + r[1], pv[2] + off[2] + r[2]];
            pts.push({ p: P, n }); cur.push(P);
            if (restP) maxDisp = Math.max(maxDisp, Math.hypot(P[0] - restP[k][0], P[1] - restP[k][1], P[2] - restP[k][2]));
            for (let q = 0; q < 3; q++) { ext[q] = Math.min(ext[q], P[q]); ext[q + 3] = Math.max(ext[q + 3], P[q]); }
          });
          if (!restP) restP = cur;
        }
      }
      for (const b of rec.bursts) for (let q = 0; q < 6; q++) pts.push({ p: [b[0] + (q % 3 - 1) * 0.8, b[1] + 0.5 + q * 0.6, b[2] + (q % 2 - 0.5)], n: '*burst' });
      // 방향별 가시성
      const vis = YAWS.map(yaw => {
        const d = [Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch), Math.cos(pitch) * Math.cos(yaw)];
        let s = 0, fogLoss = 0, why = { 1: 0, 2: 0, 3: 0 };
        for (const q of pts) {
          let seen = 0;
          for (const j of [[0, 0, 0], [0.35, 0.35, 0], [-0.35, 0, 0.35]]) {
            const hit = march(occ, [q.p[0] + j[0], q.p[1] + j[1], q.p[2] + j[2]], d, null);
            if (!hit) seen += 1 / 3; else why[hit]++;
          }
          const f = fogAt(m, base, q.p);
          s += seen * (1 - f); fogLoss += seen * f;
        }
        return { v: pts.length ? s / pts.length : 1, fog: pts.length ? fogLoss / pts.length : 0, why };
      });
      const vs = vis.map(x => x.v), best = Math.max(...vs), bestYaw = vs.indexOf(best);
      // 동작 카메라가 고를 수 있는 높이(±0.2)까지 포함한 최선
      let camBest = best;
      for (const p2 of [Math.max(0.3, pitch - 0.2), Math.min(1.2, pitch + 0.22)]) for (const yaw of YAWS) {
        const d = [Math.cos(p2) * Math.sin(yaw), Math.sin(p2), Math.cos(p2) * Math.cos(yaw)];
        let c = 0; for (const q of pts) if (!march(occ, q.p, d, null)) c++;
        camBest = Math.max(camBest, pts.length ? c / pts.length : 1);
      }
      const flags = [];
      if (rec.err) flags.push('실행 오류: ' + rec.err.message);
      if (rec.hung) flags.push('끝나지 않음');
      if (rec.missing.size) flags.push('없는 부품: ' + [...rec.missing].join(','));
      if (rec.missLights.size) flags.push('없는 조명: ' + [...rec.missLights].map(n => n + (allLightNames.has(n) ? '(16개 제한에 잘림)' : '')).join(','));
      const nightOnly = rec.flashes.filter(n => nightLights.has(n));
      if (nightOnly.length) flags.push('밤 전용 조명만 깜빡임(낮엔 안 보임): ' + nightOnly.join(','));
      if (!moved.length && !rec.bursts.length) flags.push('움직이는 부품·입자 없음(조명/발광만)');
      if (moved.length && maxDisp < 1.6 && !rec.spins.size) flags.push(`움직임이 작음(최대 ${maxDisp.toFixed(1)}칸)`);
      if (camBest < 0.5) flags.push(`카메라를 돌려도 잘 안 보임(최대 ${(camBest * 100) | 0}%)`);
      const meanV = vs.reduce((s, v) => s + v, 0) / vs.length;
      
      const fogMax = Math.max(...vis.map(x => x.fog));
      if (fogMax > 0.15) flags.push(`안개 속(${(fogMax * 100) | 0}%)`);
      const extSize = isFinite(ext[0]) ? [ext[3] - ext[0], ext[4] - ext[1], ext[5] - ext[2]].map(v => Math.round(v)) : null;
      const line = `  ${flags.length ? '!!' : 'ok'} ${a.name.padEnd(10)} ${vs.map(v => String(Math.round(v * 100)).padStart(3)).join(' ')}  best ${bestYaw * 45}° cam ${(camBest * 100) | 0}%  props[${moved.join(',')}] vox ${nVox} disp ${maxDisp.toFixed(1)} ext ${extSize}${rec.bursts.length ? ' bursts ' + rec.bursts.length : ''}`;
      console.log(line);
      flags.forEach(f => console.log('       - ' + f));
      if (verbose) vis.forEach((x, k) => console.log(`       ${k * 45}°: ${(x.v * 100) | 0}% fog ${(x.fog * 100) | 0}% why ${JSON.stringify(x.why)}`));
      report.push({ map: m.id, act: a.name, vis: vs.map(v => +v.toFixed(2)), best: bestYaw, flags, ext: isFinite(ext[0]) ? ext.map(v => +v.toFixed(1)) : null });
    }
  }
  fs.writeFileSync(path.join(__dirname, 'audit.json'), JSON.stringify(report, null, 1));
})();
