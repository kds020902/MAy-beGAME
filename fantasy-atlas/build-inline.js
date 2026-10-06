// maps/index.html의 로컬 스크립트를 모두 끼워 넣어 게시용 단일 파일을 만든다
const fs = require('fs');
const dir = __dirname + '/maps/';
let h = fs.readFileSync(dir + 'index.html', 'utf8');
let n = 0, missing = [];
h = h.replace(/<script src="((?:audio\/)?[a-z0-9-]+\.js)"><\/script>/g, (m, f) => {
  if (!fs.existsSync(dir + f)) { missing.push(f); return ''; }
  n++;
  return '<script>\n' + fs.readFileSync(dir + f, 'utf8') + '\n</script>';
});
fs.writeFileSync(__dirname + '/fate-five-atlas.html', h);
console.log('inlined', n, 'files,', Math.round(h.length / 1024), 'KB', missing.length ? 'MISSING ' + missing.join(',') : '');
