# Tak Wing's Page

Static GitHub Pages version of the public WordPress archive at:

https://yutakwing001.wordpress.com/

The site is plain HTML, CSS, and JavaScript. It includes:

- a migrated homepage
- 24 generated post pages under `posts/`
- JSON-powered client-side search
- dark mode and responsive navigation
- `.nojekyll` so GitHub Pages serves the static files directly

To regenerate from the saved WordPress export:

```bash
node generate-site.mjs
```

GitHub Pages can serve this from the repository root on the default branch.
