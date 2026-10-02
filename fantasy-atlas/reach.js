// 걸어서 닿을 수 있는지: 서 있을 수 있는 면(위 2칸 빈 블록)을 한 칸 단차로 이어 묶고, 큰 덩어리 밖의 넓은 단을 알린다
const fs = require('fs'), vm = require('vm'), path = require('path');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
const ctx = { THREE: { Color }, console, Math, Map, Set }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js')) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
let { W, D, H } = ctx.VX;
const only = process.argv[2];
for (const m of ctx.MAPS) {
  if (only && m.id !== only && m.cat !== only) continue;
  const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base || 24; m.build(w); W = w.W; D = w.D; H = w.H;
  const names = Object.fromEntries(Object.entries(w.id).map(([k, v]) => [v, k]));
  // 각 기둥의 서 있을 수 있는 면들(액체 아래 제외)
  const lv = (x, z) => w.liq[x + W * z];
  const stand = new Map(); // key x,z -> [ys]
  for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
    const ys = [];
    for (let y = 0; y < H - 2; y++) if (w.get(x, y, z) && !w.get(x, y + 1, z) && !w.get(x, y + 2, z) && !(lv(x, z) >= 0 && y < lv(x, z) - 2)) ys.push(y);
    stand.set(x + W * z, ys);
  }
  const id = new Map(); let comps = [];
  const key = (x, y, z) => x + W * (z + D * y);
  for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) for (const y of stand.get(x + W * z)) {
    const k0 = key(x, y, z); if (id.has(k0)) continue;
    const c = { n: 0, x0: x, x1: x, z0: z, z1: z, ys: 0, blocks: {} }, q = [[x, y, z]]; id.set(k0, comps.length);
    while (q.length) {
      const [cx, cy, cz] = q.pop(); c.n++; c.ys += cy; c.x0 = Math.min(c.x0, cx); c.x1 = Math.max(c.x1, cx); c.z0 = Math.min(c.z0, cz); c.z1 = Math.max(c.z1, cz);
      const bn = names[w.get(cx, cy, cz)]; c.blocks[bn] = (c.blocks[bn] || 0) + 1;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx, nz = cz + dz; if (nx < 0 || nz < 0 || nx >= W || nz >= D) continue;
        for (const ny of stand.get(nx + W * nz)) {
          if (Math.abs(ny - cy) > 1) continue;
          // 올라갈 때 머리 위 공간
          if (ny > cy && w.get(cx, cy + 3, cz)) continue;
          if (ny < cy && w.get(nx, ny + 3, nz)) continue;
          const k = key(nx, ny, nz); if (id.has(k)) continue; id.set(k, comps.length); q.push([nx, ny, nz]);
        }
      }
    }
    comps.push(c);
  }
  comps.sort((a, b) => b.n - a.n);
  const main = comps[0];
  console.log(`\n■ ${m.id}  덩어리 ${comps.length}개, 가장 큰 것 ${main.n}칸`);
  comps.slice(1).filter(c => c.n >= 120).slice(0, 12).forEach(c => {
    const top = Object.entries(c.blocks).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => k + ':' + v).join(' ');
    console.log(`   ${String(c.n).padStart(5)}칸  x ${c.x0}-${c.x1} z ${c.z0}-${c.z1}  평균높이 ${(c.ys / c.n - w.base).toFixed(1)}  [${top}]`);
  });
}
