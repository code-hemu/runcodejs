# Changelog

## 0.3.0

- Style consistency: single-quote refactor across `src/style.ts`
- Fixed line-height inheritance in container
- Improved editor width flexibility (`auto` instead of `100%`)
- Enforced `text-decoration: none` on brand link

## 0.2.0

- Initial release
- HTML/CSS/JS editor with live preview
- Multiple themes (light, dark, dracula, monokai, nord)
- Custom theme support via `defineTheme()`
- `clickToLoad` mode for static preview
- `extract` feature for assembling code from DOM elements
- Security options (`network`, `dialogs`)
- Preview zoom levels (0.25x, 0.5x, 1x)
- Custom tab config (editor-only, preview-only, split view)
- CSP-based network restriction
- Debounced live execution
