// 모든 지도의 메시 지문(정점 수 + 위치·색 합)을 찍는다: 메셔 최적화 전후 비교용
const fs = require('fs'), vm = require('vm'), path = require('path');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
class BG { setAttribute(k, a) { this.attributes = this.attributes || {}; this.attributes[k] = a; } setIndex(i) { this.index = i; } computeBoundingSphere() {} }
const THREE = { Color, BufferGeometry: BG, Float32BufferAttribute: function (a, n) { this.array = a; this.count = a.length / n; }, BufferAttribute: function (a, n) { this.array = a; this.count = a.length / n; } };
const ctx = { THREE, console, Math, Map, Set }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js')) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
const only = process.argv[2], lines = [];
let tMesh = 0;
for (const m of ctx.MAPS) {
  if (only && m.id !== only && m.cat !== only) continue;
  const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base || 24; m.build(w);
  const t0 = Date.now(); const g = ctx.VX.buildGeometry(w); tMesh += Date.now() - t0;
  const sig = ['lit', 'glow', 'nite'].map(k => { const G = g[k]; if (!G) return k + ':-'; const p = G.attributes.position.array, c = G.attributes.color.array; let sp = 0, sc = 0; for (let i = 0; i < p.length; i++) sp += p[i] * ((i % 7) + 1); for (let i = 0; i < c.length; i++) sc += c[i] * ((i % 5) + 1); return `${k}:${p.length}/${sp.toFixed(1)}/${sc.toFixed(3)}/${G.index.array.length}`; }).join(' ');
  lines.push(`${m.id} ${sig}`);
}
fs.writeFileSync(process.argv[3] || 'meshsum.txt', lines.join('\n'));
console.log('mesh total ms', tMesh, 'maps', lines.length);
