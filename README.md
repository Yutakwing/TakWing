# Tak Wing's Page

Static GitHub Pages portfolio for physiotherapy education, teaching and learning, reflective practice, and educational technology.

The site is plain HTML, CSS, and JavaScript. It includes:

- a curated academic portfolio homepage
- 16 generated post pages under `posts/`
- Traditional Chinese and Simplified Chinese versions under `zh-hant/` and `zh-hans/`
- an academic notes page
- JSON-powered client-side search
- dark mode and responsive navigation
- `.nojekyll` so GitHub Pages serves the static files directly

To regenerate from the saved post data:

```bash
node generate-site.mjs
```

GitHub Pages can serve this from the repository root on the default branch.
