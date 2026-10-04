const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

for (const file of ['index.html', 'style.css', 'script.js', 'img/borboleta.png']) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} must exist`);
}

assert.match(html, /<html lang="pt-BR">/);
assert.match(html, /Bodoni\+Moda/);
assert.match(html, /font-awesome\/6\.5\.1\/css\/all\.min\.css/);
for (const id of ['hero', 'sobre', 'trabalhos', 'branding', 'contato']) {
  assert.match(html, new RegExp(`id="${id}"`));
}
for (const asset of ['projeto-1.jpg', 'projeto-2.jpg', 'projeto-3.jpg', 'projeto-4.jpg', 'projeto-5.jpg']) {
  assert.match(html, new RegExp(`img/${asset}`));
}
assert.match(css, /--color-1:\s*#F2F2F2/);
assert.match(css, /--font-display:\s*'Bodoni Moda'/);
assert.match(css, /\.gallery-item:hover img/);
assert.doesNotMatch(js, /IntersectionObserver|\.reveal|\.is-visible|data-year|new Date/);
assert.doesNotMatch(css, /opacity:\s*0\s*;/);
console.log('Portfolio static acceptance checks passed.');
