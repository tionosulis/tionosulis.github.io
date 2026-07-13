# tionosulis.github.io

Personal website and blog: https://tionosulis.github.io/

## Tech Stack

- **Eleventy** v3 — static site generator (ESM)
- **Shiki** — dual-theme syntax highlighting
- **Vanilla CSS** — CSS nesting, custom properties, dark/light toggle
- **JetBrains Mono** — locally hosted variable font (OFL-1.1)
- **Service Worker** — offline support with vanilla JS

## Development

```bash
npm install
npm run serve    # local dev server at localhost:8080
npm run build    # production build to _site/
```

## License

**Theme & Build Tools** — MIT
The CSS framework, Nunjucks layouts, Eleventy configuration, and build scripts
in `_includes/layouts/`, `content/assets/css/`, `eleventy.config.js`,
`scripts/`, and `content/sw.njk` are free to use, modify, and distribute.

**Content** — All Rights Reserved
All blog posts, articles, images, and written content in `content/posts/`,
`content/about/`, `content/assets/img/`, `content/index.njk` (specific copy),
and `_data/metadata.js` are my own work. Do not reproduce without permission.

**Fonts** — SIL Open Font License 1.1
The locally hosted font files in `content/assets/fonts/` are copyright
their respective foundries. See `content/assets/fonts/OFL.txt` for details.
