// 지형 위로 같은 블록이 여러 칸 쌓인 기둥 찾기: node tall.js <id> [min=4]
const fs = require('fs'), vm = require('vm'), path = require('path');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
const ctx = { THREE: { Color }, console, Math, Map, Set }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js')) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
const [id, mn] = process.argv.slice(2);
const m = ctx.MAPS.find(q => q.id === id);
const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base; m.build(w);
const names = Object.fromEntries(Object.entries(w.id).map(([k, v]) => [v, k]));
const cnt = {};
for (let z = 0; z < w.D; z++) for (let x = 0; x < w.W; x++) {
  const g = w.hm[x + w.W * z]; let y = g + 1, run = 0, b0 = 0;
  while (y < w.H && w.get(x, y, z)) { const b = w.get(x, y, z); if (b === b0) run++; else { b0 = b; run = 1; } y++; }
  if (y - g - 1 >= (+mn || 4)) { const k = names[w.get(x, g + 1, z)] + '>' + names[w.get(x, y - 1, z)]; (cnt[k] = cnt[k] || []).push(`${x},${z}:${y - g - 1}`); }
}
for (const k in cnt) console.log(k, cnt[k].length, cnt[k].slice(0, 6).join(' '));
