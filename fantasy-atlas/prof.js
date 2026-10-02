// 지도 빌드 구간별 시간: build 함수 안의 '// ──' 주석마다 시간을 찍는다
const fs = require('fs'), vm = require('vm'), path = require('path');
class Color { constructor(h) { this.set(h || '#000'); } set(h) { const n = parseInt(String(h).slice(1), 16); this.r = (n >> 16 & 255) / 255; this.g = (n >> 8 & 255) / 255; this.b = (n & 255) / 255; return this; } }
const ctx = { THREE: { Color }, console, Math, Map, Set, Date }; ctx.window = ctx; vm.createContext(ctx);
const dir = path.join(__dirname, 'maps');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const id = process.argv[2];
for (const f of [...html.matchAll(/<script src="([a-z0-9-]+\.js)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'app.js')) {
  let src = fs.readFileSync(path.join(dir, f), 'utf8');
  if (src.includes("id: '" + id + "'")) { let k = 0; src = src.replace(/\n(\s*)\/\/ ── ([^\n]*)/g, (m, sp, t) => `\n${sp}__T(${JSON.stringify(t.slice(0, 24))});\n${sp}// ── ${t}`); }
  vm.runInContext(src, ctx, { filename: f });
}
let last = Date.now(), lastName = 'start';
ctx.__T = name => { const t = Date.now(); console.log(String(t - last).padStart(6), 'ms', lastName); last = t; lastName = name; };
const m = ctx.MAPS.find(q => q.id === id);
const w = new ctx.VX.World(m.blocks, m.seed, null, m.size); w.base = m.base || 24; m.build(w); ctx.__T('end');
