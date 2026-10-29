// Static server for dist/ on :4173 whose sw.js can be "bumped" (a comment appended) to simulate a new deploy.
// dist/ itself is never modified.
const http = require('http'); const fs = require('fs'); const path = require('path');
const DIST = path.resolve(__dirname, '../../../../dist');
let version = 0;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__bump') { version++; res.end('v' + version); return; }
  let p = path.join(DIST, decodeURIComponent(url.pathname));
  if (!p.startsWith(DIST)) { res.statusCode = 403; return res.end(); }
  if (url.pathname === '/' || !fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(DIST, 'index.html');
  let body = fs.readFileSync(p);
  if (url.pathname === '/sw.js' && version) body = Buffer.concat([body, Buffer.from(`\n// deploy v${version}\n`)]);
  res.setHeader('Content-Type', TYPES[path.extname(p)] || 'application/octet-stream');
  if (url.pathname === '/sw.js') res.setHeader('Cache-Control', 'no-cache');
  res.end(body);
}).listen(4173, () => console.log('bump server on 4173'));
