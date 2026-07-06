# Theme Examples

Exprify's RunCode widget ships with a set of carefully designed built-in themes and a full theming API that lets you define, override, and switch themes at any point in your application's lifecycle.


## Built-in Themes

Five themes are included out of the box, covering both light and dark preferences. Pass the theme name as a string to the `theme` option during initialization.

```js
const config = {
  element: '.editor',
  code: { html: '<h1>Hello</h1>' }
};

new RunCode({ ...config, theme: 'light' });
new RunCode({ ...config, theme: 'dark' });
new RunCode({ ...config, theme: 'dracula' });
new RunCode({ ...config, theme: 'monokai' });
new RunCode({ ...config, theme: 'nord' });
```

| Theme | Style | Description |
|---|---|---|
| `light` | Light | Clean white background, high contrast text, suitable for daytime use |
| `dark` | Dark | Neutral dark surface, easy on the eyes in low-light environments |
| `dracula` | Dark | Purple-tinted dark theme with vibrant accent colors |
| `monokai` | Dark | Classic editor theme with warm tones and rich syntax highlights |
| `nord` | Dark | Arctic-inspired cool blues and muted tones, soft on contrast |


## Switch at Runtime

You can change the active theme at any point after initialization by calling `setTheme()` on the RunCode instance. This applies the new theme immediately without re-creating the editor.

```js
const editor = new RunCode({
  element: '.editor',
  theme: 'dark'
});

// Switch to light theme later, e.g. when the user toggles a preference
editor.setTheme('light');
```

This is useful for implementing user-controlled theme toggles, system-level dark mode detection, or any scenario where the theme needs to respond to runtime state changes.


## Custom Theme

`RunCode.defineTheme()` lets you register a completely custom theme by supplying a name and a map of CSS custom properties. Every visual aspect of the widget - backgrounds, surfaces, borders, typography, and buttons - is controlled through these variables.

```js
RunCode.defineTheme('synthwave', {
  '--rc-bg': '#2b213a',
  '--rc-surface': '#362748',
  '--rc-toolbar': '#261c33',
  '--rc-footer': '#1e1529',
  '--rc-text': '#ff7edb',
  '--rc-text-light': '#b0a0c0',
  '--rc-text-active': '#ffffff',
  '--rc-primary': '#ff7edb',
  '--rc-border': '#493566',
  '--rc-button': '#362748',
  '--rc-button-text': '#ff7edb',
  '--rc-button-hover': '#493566',
  '--rc-footer-button-hover': '#493566'
});

new RunCode({
  element: '.editor',
  theme: 'synthwave'
});
```

Once registered, the theme name behaves exactly like any built-in theme and can be passed to `theme` during initialization or to `setTheme()` at runtime.

### CSS Variable Reference

| Variable | Controls |
|---|---|
| `--rc-bg` | Outermost background of the widget |
| `--rc-surface` | Editor panel and tab body background |
| `--rc-toolbar` | Top toolbar background |
| `--rc-footer` | Bottom footer/status bar background |
| `--rc-text` | Primary text color |
| `--rc-text-light` | Secondary or dimmed text color |
| `--rc-text-active` | Text color for active/selected elements |
| `--rc-primary` | Accent color used for highlights and indicators |
| `--rc-border` | Border and divider color throughout the widget |
| `--rc-button` | Default button background |
| `--rc-button-text` | Default button text color |
| `--rc-button-hover` | Button background on hover |
| `--rc-footer-button-hover` | Footer button background on hover |


## Extend a Built-in Theme

Instead of defining every variable from scratch, you can inherit all values from an existing theme and selectively override only what you want to change. Pass the base theme name as the third argument to `RunCode.defineTheme()`.

```js
// Inherits all values from 'light', then overrides just the primary accent color
RunCode.defineTheme('custom-light', {
  '--rc-primary': '#ff6347'
}, 'light');
```

This is the recommended approach when you only need to adjust a few properties, such as branding a particular accent color across an otherwise standard theme. Any variables you do not specify are inherited from the base theme unchanged.