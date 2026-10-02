// 지도 생성 검사: 빌드 오류, 부품이 땅에 박히는지, 조명이 광원 근처인지, 물길이 막히는지
const fs = require('fs'), vm = require('vm'), path = require('path');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
class BG { setAttribute(k, a) { this.attributes = this.attributes || {}; this.attributes[k] = a; } setIndex(i) { this.index = i; } computeBoundingSphere() {} }
const THREE = { Color, BufferGeometry: BG, Float32BufferAttribute: function (a) { this.count = a.length / 3; }, BufferAttribute: function (a, n) { this.array = a; this.count = a.length / n; } };
const ctx = { THREE, console, Math, Map, Set }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js');
for (const f of files) { const p = path.join(dir, f); if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f }); else console.log('  (없음)', f); }
const only = process.argv[2];
let { W, D, H } = ctx.VX;
let problems = 0;
for (const m of ctx.MAPS) {
  if (only && m.id !== only && m.cat !== only) continue;
  const t0 = Date.now();
  const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base || 24; W = w.W; D = w.D; H = w.H;
  let info;
  try { info = m.build(w); } catch (e) { problems++; console.log(m.id, 'BUILD ERROR', e.stack.split('\n').slice(0, 4).join(' | ')); continue; }
  const t1 = Date.now();
  const g = ctx.VX.buildGeometry(w);
  let liq = 0; for (const v of w.liq) if (v >= 0) liq++;
  console.log(`${m.cat}/${m.id}  build ${t1 - t0}ms mesh ${Date.now() - t1}ms  verts ${g.lit.attributes.position.count}  liq ${liq}  lights ${(info.lights || []).length}  acts ${(info.acts || []).length}  props ${(w.props || []).length}`);
  const issue = s => { problems++; console.log('   !! ' + s); };
  (w.warn || []).forEach(issue);
  if (w.over) issue(`월드 높이를 넘겨 잘린 블록 ${w.over}칸`);
  for (const pr of (w.props || [])) if (pr.w.over) issue(`부품 ${pr.o.name || '?'}: 높이를 넘겨 잘린 블록 ${pr.w.over}칸`);
  // 부품이 월드 블록과 겹치는지(박힘)
  for (const pr of (w.props || [])) {
    let clip = 0, below = 0, n = 0;
    for (const [i] of pr.w.data) {
      n++;
      const x = i % W, z = Math.floor(i / W) % D, y = Math.floor(i / (W * D));
      if (w.get(x, y, z)) clip++;
    }
    if (!n) issue(`부품 ${pr.o.name || '?'} 이(가) 비어 있음`);
    if (clip > (pr.o.clipOK || 0)) issue(`부품 ${pr.o.name || '?'}: ${clip}/${n}칸이 지형·건물과 겹침`);
  }
  // 조명 근처에 광원 블록이 있는지
  const isSrc = (wd, x, y, z) => { const id = wd.get(x, y, z); if (!id) return false; const b = wd.blocks[id]; return !!(b.glow || b.night); };
  (info.lights || []).forEach((L, k) => {
    const [lx, ly, lz] = L.p.map(Math.floor);
    let ok = false;
    const R = L.srcR || 4;
    for (let dy = -R; dy <= R && !ok; dy++) for (let dz = -R; dz <= R && !ok; dz++) for (let dx = -R; dx <= R && !ok; dx++) {
      if (isSrc(w, lx + dx, ly + dy, lz + dz)) ok = true;
      else for (const pr of (w.props || [])) if (isSrc(pr.w, lx + dx, ly + dy, lz + dz)) { ok = true; break; }
    }
    if (!ok && !L.liquid) issue(`조명 #${k}${L.name ? ' (' + L.name + ')' : ''} [${L.p.map(v => Math.round(v))}] 근처에 광원이 없음`);
    if (L.liquid) { const lv = w.liq[lx + W * lz]; if (lv == null || lv < 0) issue(`조명 #${k} 아래에 액체가 없음`); }
  });
  (info.landmarks || []).forEach(l => { if (l.p.some(v => !isFinite(v)) || l.p[0] < 0 || l.p[0] > W || l.p[2] < 0 || l.p[2] > D) issue('라벨 위치 이상: ' + l.name); });
  (info.acts || []).forEach(a => { if (a.hit.some(v => !isFinite(v)) || a.hit[3] < a.hit[0] || a.hit[4] < a.hit[1] || a.hit[5] < a.hit[2]) issue('상호작용 영역 이상: ' + a.name); });
}
console.log(problems ? `문제 ${problems}건` : '문제 없음');
