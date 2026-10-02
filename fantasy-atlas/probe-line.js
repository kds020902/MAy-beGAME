// 대각선(u) 방향으로 높이 단면을 찍는다: node probe-line.js <id> v u0 u1
const fs = require('fs'), vm = require('vm'), path = require('path');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
const ctx = { THREE: { Color }, console, Math, Map, Set }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js')) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
const [id, v, u0, u1] = process.argv.slice(2);
const m = ctx.MAPS.find(q => q.id === id);
const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base; m.build(w);
const names = Object.fromEntries(Object.entries(w.id).map(([k, v]) => [v, k]));
const S = Math.SQRT1_2;
let out = [];
for (let u = +u0; u <= +u1; u += 2) { const x = Math.round(96 + (u + +v) * S), z = Math.round(96 + (u - +v) * S); const g = w.hm[x + w.W * z]; out.push(`u${u}(${x},${z}):${g} ${names[w.get(x, g, z)]}`); }
console.log(out.join('\n'));
