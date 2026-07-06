# API Reference

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `element` | `string \| HTMLElement` | `'.rc-container'` | CSS selector or element to mount the editor |
| `theme` | `string` | `'dark'` | Built-in: `light`, `dark`, `dracula`, `monokai`, `nord` |
| `clickToLoad` | `boolean` | `false` | Show a static preview with a "Run" overlay button |
| `editable` | `boolean` | `true` | Allow editing in textareas |
| `code` | `{ html?, css?, js? }` | - | Initial code to populate editors |
| `defaultTab` | `string \| DefaultTabConfig` | `{ editor: 'html', preview: true }` | Initial active tab |
| `preview` | `PreviewConfig` | `{ live: true, debounce: 300, zoom: 1 }` | Preview behavior |
| `security` | `SecurityConfig` | `{ network: false, dialogs: false }` | Security restrictions |
| `extract` | `ExtractConfig` | - | Extract code from DOM elements |

### DefaultTabConfig

| Option | Type | Default | Description |
|---|---|---|---|
| `editor` | `'html' \| 'css' \| 'js' \| null` | `'html'` | Active editor tab; `null` hides editors |
| `preview` | `boolean` | `true` | Show preview panel |

### PreviewConfig

| Option | Type | Default | Description |
|---|---|---|---|
| `live` | `boolean` | `true` | Auto-execute on input |
| `debounce` | `number` | `300` | Debounce delay in ms |
| `zoom` | `number` | `1` | Preview zoom level (`0.25`, `0.5`, `1`) |

### SecurityConfig

| Option | Type | Default | Description |
|---|---|---|---|
| `network` | `boolean` | `false` | Allow fetch/XHR/WebSocket |
| `dialogs` | `boolean` | `false` | Allow `alert()`, `confirm()`, `prompt()` |

## Methods

| Method | Description |
|---|---|
| `init()` | Initialize the playground (called automatically) |
| `runCode()` | Execute code in the preview |
| `setTheme(name)` | Switch theme at runtime |
| `destroy()` | Remove the instance and clean up |

## Static Methods

| Method | Description |
|---|---|
| `RunCode.defineTheme(name, colors, base?)` | Register a custom theme |

## Types

```
ExtractSourceItem {
  selector: string | string[]
  target?: string
  position?: 'replace' | 'before' | 'after' | 'prepend' | 'append'
}

ExtractSource {
  html?: ExtractSourceItem[]
  css?: ExtractSourceItem[]
  js?: ExtractSourceItem[]
}
```
