# Themes

## Built-in Themes

- `light`
- `dark`
- `dracula`
- `monokai`
- `nord`

Set via the `theme` option:

```js
new RunCode({ theme: 'dracula' })
```

Switch at runtime:

```js
editor.setTheme('nord')
```

## Custom Themes

Use `defineTheme()` with CSS custom property values:

```js
RunCode.defineTheme('ocean', {
  '--rc-bg': '#0c4a6e',
  '--rc-surface': '#0f172a',
  '--rc-toolbar': '#1e293b',
  '--rc-footer': '#0f172a',
  '--rc-text': '#bae6fd',
  '--rc-text-light': '#7dd3fc',
  '--rc-text-active': '#ffffff',
  '--rc-primary': '#38bdf8',
  '--rc-border': '#334155',
  '--rc-button': '#1e293b',
  '--rc-button-text': '#bae6fd',
  '--rc-button-hover': '#334155',
  '--rc-footer-button-hover': '#1e293b'
});
```

Then use it:

```js
new RunCode({ theme: 'ocean' })
```

### Property Reference

| Property | Description |
|---|---|
| `--rc-bg` | Main background |
| `--rc-surface` | Editor surface background |
| `--rc-toolbar` | Tab bar background |
| `--rc-footer` | Footer background |
| `--rc-text` | Default text color |
| `--rc-text-light` | Muted text color |
| `--rc-text-active` | Active tab text color |
| `--rc-primary` | Accent / active tab background |
| `--rc-border` | Border color |
| `--rc-button` | Button background |
| `--rc-button-text` | Button text color |
| `--rc-button-hover` | Button hover background |
| `--rc-footer-button-hover` | Footer button hover |

### Base Theme

The third argument to `defineTheme()` sets the base theme to inherit from:

```js
// Extends 'light' instead of 'dark'
RunCode.defineTheme('custom', { '--rc-primary': '#ff0000' }, 'light');
```
