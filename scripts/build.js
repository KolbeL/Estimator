const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

fs.rmSync('www', { recursive: true, force: true });
fs.mkdirSync('www');

fs.copyFileSync('index.html', 'www/index.html');
copyDir('js',     'www/js');
copyDir('css',    'www/css');
copyDir('img',    'www/img');
copyDir('vendor', 'www/vendor');

console.log('Build complete → www/');
