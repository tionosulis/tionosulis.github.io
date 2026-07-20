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
2. User approve → commit SVG + konten post (`draft: true`)
3. Setelah draft final → generate OG PNG
4. Commit + push (`draft: false`)

## OG PNG

```bash
node -e "require('sharp')('<hero>.svg').resize(1200,630).png({compressionLevel:9,palette:true}).toFile('content/assets/img/og/<slug>.png')"
```

- Generate hanya setelah SVG final (lihat workflow di atas)
- Untuk dual-mode SVG, strip `@media` wrapper dulu (paksa dark mode)
- Palette (`palette: true`) untuk ukuran file di bawah 50KB

## AGENTS.md

JANGAN commit/push AGENTS.md ke main.
