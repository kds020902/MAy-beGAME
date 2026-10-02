// 간이 렌더러: 지도를 정사영 광선 추적으로 PNG로 뽑는다
// node snap.js <id> [yawDeg=43] [pitch=0.6] [zoom=1] [tx ty tz(복셀 좌표, 기본 중앙)] [out.png] [time=day|night] [W=900] [H=560]
const fs = require('fs'), vm = require('vm'), path = require('path'), zlib = require('zlib');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
const ctx = { THREE: { Color }, console, Math, Map, Set }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js')) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
const a = process.argv.slice(2);
const m = ctx.MAPS.find(q => q.id === a[0]);
if (!m) { console.log('no map', a[0]); process.exit(1); }
const t0 = Date.now();
const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base || 24;
const info = m.build(w) || {};
const W = w.W, D = w.D, H = w.H;
console.log('build', Date.now() - t0, 'ms');
// 부품을 쉬는 자리(off0, scl0가 0이면 숨김)로 합친다
const occ = new Uint8Array(w.data);
for (const pr of (w.props || [])) {
  const o = pr.o; if (o.scl0 && o.scl0[1] === 0 && !(process.env.PROPOFF || '').includes(o.name + ':')) continue;
  // PROPOFF='이름:x,y,z;이름2:...' 로 부품을 옮긴 상태를 그린다
  const po = (process.env.PROPOFF || '').split(';').map(t => t.split(':')).find(t => t[0] === o.name);
  const off = po ? po[1].split(',').map(Number) : (o.off0 || [0, 0, 0]);
  for (const [i, id] of pr.w.data) {
    const x = i % W + Math.round(off[0]), z = Math.floor(i / W) % D + Math.round(off[2]), y = Math.floor(i / (W * D)) + Math.round(off[1]);
    if (x >= 0 && y >= 0 && z >= 0 && x < W && y < H && z < D) occ[x + W * (z + D * y)] = id;
  }
}
const yaw = (a[1] != null ? +a[1] : 43) * Math.PI / 180, pitch = a[2] != null ? +a[2] : (m.pitch || 0.6), zoom = a[3] != null ? +a[3] : (m.zoom || 1);
const tx = a[4] != null ? +a[4] : W / 2, ty = a[5] != null ? +a[5] + w.base : w.base + (m.camY != null ? m.camY : 6), tz = a[6] != null ? +a[6] : D / 2;
const out = a[7] || path.join(__dirname, 'snap.png'), night = (a[8] || m.time || 'day') === 'night';
const IW = +(a[9] || 900), IH = +(a[10] || 560);
const cd = [Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch), Math.cos(pitch) * Math.cos(yaw)];
const xa = [Math.cos(yaw), 0, -Math.sin(yaw)], ya = [cd[1] * xa[2] - cd[2] * xa[1], cd[2] * xa[0] - cd[0] * xa[2], cd[0] * xa[1] - cd[1] * xa[0]];
const vh = W * 0.72 / zoom, wpp = 2 * vh / IH;
const hex = h => { const c = new Color(h); return [c.r, c.g, c.b]; };
const pre = night && m.night ? m.night : (!night && m.day ? m.day : null);
const sky = (pre && pre.sky) || m.sky || ['#8ab', '#cde', '#fff'];
const S0 = hex(sky[0]), S1 = hex(sky[1]);
const sunD = ((pre && pre.sun) || m.sun || ['#fff', 1, [0.5, 1, 0.4]])[2]; const sl = Math.hypot(...sunD); const sun = sunD.map(v => v / sl);
const f = m.fog || {}, fogBox = f.box || [W / 2, D / 2, W / 2, D / 2], fogStart = f.start != null ? f.start : 0.74;
const fogFloor = f.floor != null ? f.floor : w.base - 8, fogDepth = f.depth || 10, fogTop = f.top != null ? f.top : 1e4, fogTopD = f.topDepth || 18;
const liq = m.liquid ? hex(m.liquid[1]) : [0.3, 0.5, 0.8];
const blocks = w.blocks;
const img = Buffer.alloc(IW * IH * 3);
const sm = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
for (let py = 0; py < IH; py++) for (let px = 0; px < IW; px++) {
  const sx = (px - IW / 2) * wpp, sy = -(py - IH / 2) * wpp;
  const o = [tx + xa[0] * sx + ya[0] * sy + cd[0] * 400, ty + xa[1] * sx + ya[1] * sy + cd[1] * 400, tz + xa[2] * sx + ya[2] * sy + cd[2] * 400];
  const d = [-cd[0], -cd[1], -cd[2]];
  // 격자 상자 입구
  let t0 = 0, t1 = 1e9;
  for (let q = 0; q < 3; q++) { const hi = [W, H, D][q]; if (Math.abs(d[q]) < 1e-9) { if (o[q] < 0 || o[q] >= hi) t0 = 1e9; continue; } const p1 = (0 - o[q]) / d[q], p2 = (hi - o[q]) / d[q]; t0 = Math.max(t0, Math.min(p1, p2)); t1 = Math.min(t1, Math.max(p1, p2)); }
  const g = 1 - py / IH;
  let col = [S0[0] + (S1[0] - S0[0]) * g, S0[1] + (S1[1] - S0[1]) * g, S0[2] + (S1[2] - S0[2]) * g];
  const skyc = col.slice();
  if (t0 < t1) {
    const q0 = [o[0] + d[0] * (t0 + 1e-4), o[1] + d[1] * (t0 + 1e-4), o[2] + d[2] * (t0 + 1e-4)];
    let x = Math.floor(q0[0]), y = Math.floor(q0[1]), z = Math.floor(q0[2]);
    const stx = Math.sign(d[0]), sty = Math.sign(d[1]), stz = Math.sign(d[2]);
    const ddx = Math.abs(1 / d[0]), ddy = Math.abs(1 / d[1]), ddz = Math.abs(1 / d[2]);
    let mx = stx ? (stx > 0 ? x + 1 - q0[0] : q0[0] - x) * ddx : 1e9, my = sty ? (sty > 0 ? y + 1 - q0[1] : q0[1] - y) * ddy : 1e9, mz = stz ? (stz > 0 ? z + 1 - q0[2] : q0[2] - z) * ddz : 1e9;
    let face = 1, tt = 0;
    for (let n = 0; n < 1400; n++) {
      if (x < 0 || y < 0 || z < 0 || x >= W || y >= H || z >= D) { if (n > 2) break; }
      else {
        const id = occ[x + W * (z + D * y)];
        let c = null, nrm = face;
        if (id) { const b = blocks[id]; c = face === 1 ? b._t : b._c; if (b.glow || (b.night && night)) nrm = 9; else if (b.night && !night) c = b._d; }
        else { const lv = w.liq[x + W * z]; if (lv >= 0 && y <= lv) { c = liq; nrm = 1; } }
        if (c) {
          const hp = [q0[0] + d[0] * tt, q0[1] + d[1] * tt, q0[2] + d[2] * tt];
          let sh;
          if (nrm === 9) sh = 1.15;
          else { const nv = nrm === 0 ? [-stx, 0, 0] : nrm === 1 ? [0, -sty, 0] : [0, 0, -stz]; const lam = Math.max(0, nv[0] * sun[0] + nv[1] * sun[1] + nv[2] * sun[2]); sh = (night ? 0.45 : 0.62) + lam * (night ? 0.35 : 0.5) + (nv[1] > 0 ? 0.05 : 0); }
          col = [c[0] * sh, c[1] * sh, c[2] * sh];
          // 안개
          const qx = Math.abs(hp[0] - fogBox[0]) / fogBox[2], qz = Math.abs(hp[2] - fogBox[1]) / fogBox[3];
          let fo = sm(fogStart, 1, Math.pow(qx ** 4 + qz ** 4, 0.25));
          fo = Math.max(fo, sm(fogFloor, fogFloor - fogDepth, hp[1]), sm(fogTop, fogTop + fogTopD, hp[1]));
          col = col.map((v, k) => v + (skyc[k] - v) * fo);
          break;
        }
      }
      if (mx < my && mx < mz) { tt = mx; x += stx; mx += ddx; face = 0; } else if (my < mz) { tt = my; y += sty; my += ddy; face = 1; } else { tt = mz; z += stz; mz += ddz; face = 2; }
    }
  }
  const k = (py * IW + px) * 3;
  img[k] = Math.max(0, Math.min(255, col[0] * 255)); img[k + 1] = Math.max(0, Math.min(255, col[1] * 255)); img[k + 2] = Math.max(0, Math.min(255, col[2] * 255));
}
// PNG
const crcT = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc = buf => { let c = -1; for (const b of buf) c = crcT[(c ^ b) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
const raw = Buffer.alloc((IW * 3 + 1) * IH);
for (let y = 0; y < IH; y++) { raw[y * (IW * 3 + 1)] = 0; img.copy(raw, y * (IW * 3 + 1) + 1, y * IW * 3, (y + 1) * IW * 3); }
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(IW, 0); ihdr.writeUInt32BE(IH, 4); ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
fs.writeFileSync(out, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]));
console.log('wrote', out, (Date.now() - t0) + 'ms', 'acts', (info.acts || []).length, 'lights', (info.lights || []).length);
