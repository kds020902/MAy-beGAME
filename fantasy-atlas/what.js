// 특정 칸 위의 블록 이름: node what.js <id> x z [x z ...]
const fs = require('fs'), vm = require('vm'), path = require('path');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
const ctx = { THREE: { Color }, console, Math, Map, Set }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js')) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
const a = process.argv.slice(2), m = ctx.MAPS.find(m => m.id === a[0]);
const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base || 24; m.build(w);
const names = Object.fromEntries(Object.entries(w.id).map(([k, v]) => [v, k]));
for (let i = 1; i < a.length; i += 2) {
  const x = +a[i], z = +a[i + 1], g = w.hm[x + w.W * z], col = [];
  for (let y = g - 2; y < w.H; y++) { const b = w.get(x, y, z); if (b) col.push((y - w.base) + ':' + names[b]); }
  console.log(`(${x},${z}) hm ${g - w.base}:`, col.join(' '));
}
