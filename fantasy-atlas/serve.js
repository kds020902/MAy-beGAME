// 미리보기용 정적 서버: index.html을 게시 때와 같은 문서 골격으로 감싼다
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'maps');
const types = { '.js': 'text/javascript', '.html': 'text/html; charset=utf-8', '.css': 'text/css' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end('not found'); }
  let body = fs.readFileSync(f);
  if (p === '/index.html') {
    body = '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>' + body + '</body></html>';
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(body);
}).listen(5178, () => console.log('serving on http://localhost:5178'));
