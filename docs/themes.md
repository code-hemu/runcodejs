# Themes

Exprify's RunCode editor supports a flexible theming system. You can use one of the built-in themes out of the box, or define your own fully custom theme using CSS custom properties.


## Built-in Themes

The following themes are included and ready to use without any additional configuration:

| Theme | Description |
|---|---|
| `light` | Clean white interface, ideal for well-lit environments |
| `dark` | Dark gray background with muted tones, easy on the eyes |
| `dracula` | Deep purple-tinted dark theme with vibrant accent colors |
| `monokai` | Warm dark theme inspired by the classic Monokai color scheme |
| `nord` | Cool, arctic blue-toned dark theme based on the Nord palette |

### Setting a Theme on Initialization

Pass the `theme` option when creating a new RunCode instance:

```js
new RunCode({ theme: 'dracula' })
```

### Switching Themes at Runtime

You can switch themes dynamically at any point after initialization using `setTheme()`:

```js
editor.setTheme('nord')
```

This allows you to build features like a theme picker or honor the user's system color scheme preference without reloading the editor.


## Custom Themes

For complete visual control, use `RunCode.defineTheme()` to register a custom theme by name. Custom themes are defined using a set of CSS custom properties (variables) that map to different parts of the editor UI.

### Defining a Custom Theme

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

Once registered, use the theme name just like any built-in theme:

```js
new RunCode({ theme: 'ocean' })
```

### CSS Custom Property Reference

Each property controls a specific visual region of the editor. You only need to specify the properties you want to override - unspecified properties inherit from the base theme.

| Property | What it Controls |
|---|---|
| `--rc-bg` | Outermost background of the entire editor container |
| `--rc-surface` | Background of the code editing area itself |
| `--rc-toolbar` | Background of the tab bar at the top |
| `--rc-footer` | Background of the bottom action bar |
| `--rc-text` | Default text color used throughout the UI |
| `--rc-text-light` | Muted or secondary text, such as inactive tab labels |
| `--rc-text-active` | Text color for the currently active tab label |
| `--rc-primary` | Accent color used for the active tab background and highlights |
| `--rc-border` | Color of borders and dividers between UI sections |
| `--rc-button` | Background color of toolbar and action buttons |
| `--rc-button-text` | Text color on buttons |
| `--rc-button-hover` | Button background color when hovered |
| `--rc-footer-button-hover` | Hover background for buttons specifically in the footer bar |


## Base Theme Inheritance

By default, any custom theme you define inherits unspecified values from the built-in `dark` theme. If your custom theme is closer to a light design, you can pass a third argument to `defineTheme()` to set a different base:

```js
// Inherits unset values from 'light' instead of 'dark'
RunCode.defineTheme('custom', { '--rc-primary': '#ff0000' }, 'light');
```

This is useful when you only want to override one or two accent colors without redefining the full property set. For example, to create a light theme with a red primary accent, you only need to specify `--rc-primary` and let everything else fall back to the `light` defaults.

### Inheritance Chain

When a property is not defined in your custom theme, the resolution order is:

1. Your custom theme properties
2. The specified base theme (`light`, `dark`, or any other built-in)
3. Browser defaults

This means you can create a minimal custom theme with just a handful of overrides while still getting a coherent, complete visual result.