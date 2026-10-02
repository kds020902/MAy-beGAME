// index.html의 스크립트 목록을 완성된 지도만으로 다시 쓴다. 사용: node set-scripts.js d-ashen d-forest ...
const fs = require('fs');
const p = __dirname + '/maps/index.html';
let h = fs.readFileSync(p, 'utf8');
const maps = process.argv.slice(2);
const list = ['voxel', 'kit', 'kit2'].concat(maps).concat(['app']);
h = h.replace(/<script src="voxel\.js"><\/script>[\s\S]*<script src="app\.js"><\/script>/, list.map(f => `<script src="${f}.js"></script>`).join('\n'));
fs.writeFileSync(p, h);
console.log('scripts:', list.join(' '));
