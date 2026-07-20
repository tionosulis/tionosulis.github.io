# Workflow Notes

## Server

```bash
kill $(lsof -ti :3000) 2>/dev/null; npx @11ty/eleventy --serve --port=3000
```

Jalankan di terminal langsung (bukan `nohup`/`&`).  
Build pertama ~30 detik, hot reload ~1-2 detik.

Port 3000, bukan 8080.

## SVG → Post

1. Buat SVG → kirim kode ke user untuk review
2. User approve → minify + commit SVG + konten post (`draft: true`)
3. Setelah draft final → generate OG PNG
4. Commit + push (`draft: false`)

## SVG Minifikasi

Terapkan setelah SVG final (step 2), sebelum OG generation — baik hero maupun
inline illustration.

**Safe operations only** (no path simplification/rounding):
- Strip `<?xml?>` declarations
- Strip `<!-- comments -->`
- Collapse whitespace antar-tag (kecuali dalam `<text>`/`<tspan>`)
- Fix `xmlns` → `http://www.w3.org/2000/svg`
- Hapus blank lines

```bash
node -e "
const fs = require('fs'), path = require('path');
const DIR = 'content/assets/img';
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.svg'))) {
  let s = fs.readFileSync(path.join(DIR,f), 'utf-8');
  const orig = s.length;
  s = s.replace(/<\?xml[^>]*\?>\s*/gi, '').replace(/<!--[\s\S]*?-->/g, '')
      .replace(/xmlns=\"http:\/\/w3\.org\"/g, 'xmlns=\"http://www.w3.org/2000/svg\"');
  s = s.split('\n').map(l => l.trim()).filter(Boolean).join('\n');
  fs.writeFileSync(path.join(DIR,f), s, 'utf-8');
  console.log(f+': '+orig+' → '+s.length+' bytes');
}
"
```

## OG PNG

```bash
node -e "require('sharp')('<hero>.svg').resize(1200,630).png({compressionLevel:9,palette:true}).toFile('content/assets/img/og/<slug>.png')"
```

- Generate hanya setelah SVG final (lihat workflow di atas)
- Palette (`palette: true`) untuk ukuran file di bawah 50KB
- **Untuk dual-mode SVG** — strip `@media (prefers-color-scheme: dark)` wrapper, paksa dark mode:

```bash
node -e "
const fs = require('fs'), sharp = require('sharp');
const slug = '<post-slug>';
let svg = fs.readFileSync('content/assets/img/'+slug+'.svg','utf-8');
const mq = '@media (prefers-color-scheme: dark)';
const start = svg.indexOf(mq);
if (start > -1) {
  const brace = svg.indexOf('{', start);
  let depth = 1, i = brace + 1;
  while (i < svg.length && depth > 0) {
    if (svg[i] === '{') depth++;
    if (svg[i] === '}') depth--;
    i++;
  }
  const dark = svg.slice(brace+1, i-1).trim();
  const tmp = '/tmp/'+slug+'-dark.svg';
  fs.writeFileSync(tmp, svg.replace(/<style>[\s\S]*?<\/style>/,
    () => '<style>\n'+dark+'\n</style>'), 'utf-8');
  sharp(tmp).resize(1200,630).png({compressionLevel:9,palette:true})
    .toFile('content/assets/img/og/'+slug+'.png').then(() => fs.unlinkSync(tmp));
}
"

## AGENTS.md

JANGAN commit/push AGENTS.md ke main.
