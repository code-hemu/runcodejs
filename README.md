# coderun

A lightweight HTML, CSS and JavaScript playground with live preview.

## Install

```bash
npm install coderun
```

## Usage

```html
<div class="codehemu-editer"></div>

<script type="module">
import RunCode from 'coderun';

const editor = new RunCode({
  element: '.codehemu-editer',
  theme: 'light',
  autoRun: true,
  zoom: 1
});
</script>
```

```html
<!-- CDN -->
<script src="https://unpkg.com/coderun/dist/runcode.min.js"></script>
<script>
const editor = new RunCode({
  element: '.codehemu-editer',
  theme: 'light',
  autoRun: true
});
</script>
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `element` | string/Element | `'.codehemu-editer'` | CSS selector or DOM element |
| `theme` | string | `'light'` | `'light'` or `'dark'` |
| `autoRun` | boolean | `true` | Auto-execute code on input |
| `zoom` | number | `1` | Default zoom level (`0.25`, `0.5`, `1`) |
| `extractCode` | boolean | `false` | Enable Prism.js code block scraping |

## API

```js
const editor = new RunCode(options)

editor.init()              // Initialize the playground
editor.runCode()           // Manually execute code
editor.setTheme('dark')    // Switch theme
```

## License

