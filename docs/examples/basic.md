# Basic Examples

A collection of practical RunCode configurations, from minimal setups to fully featured editors. Each example demonstrates a distinct use case or feature set.


## Minimal

The simplest possible RunCode setup. Pass an element selector and a `code` object containing your HTML, CSS, and JS. RunCode handles the rest - rendering the tabbed editor and live preview automatically.

```js
new RunCode({
  element: '.editor',
  code: {
    html: '<h1>Hello</h1>',
    css: 'h1 { color: blue; }',
    js: 'console.log("hello");'
  }
});
```

## Preview Only

Hides the editor panel entirely and shows only the rendered preview. Useful for embedding demos or displaying finished output without exposing the source code to the user. Set `editor` to `null` to suppress the editor tab.

```js
new RunCode({
  element: '.preview-only',
  defaultTab: { editor: null, preview: true },
  code: {
    html: '<h1>Preview</h1>'
  }
});
```

## Editor Only

Shows the code editor but hides the preview panel. Ideal for read-only code display, documentation snippets, or cases where you want the user to write code without running it immediately. Set `preview` to `false` to suppress the preview pane.

```js
new RunCode({
  element: '.editor-only',
  defaultTab: { editor: 'html', preview: false }
});
```

## clickToLoad

Defers execution until the user explicitly clicks the **Run Code** button. Prevents the code from running on page load, which is useful for performance-sensitive pages, code that has side effects, or demos that require user intent before running.

```js
new RunCode({
  element: '.click-to-load',
  clickToLoad: true,
  code: {
    html: '<h1>Click "Run Code" to start</h1>',
    css: 'h1 { animation: pulse 2s infinite; }',
    js: 'console.log("running");'
  }
});
```

## Custom Theme

RunCode supports custom themes via `RunCode.defineTheme(name, vars)`. Define a named theme by providing CSS custom property overrides, then apply it to any instance using the `theme` option. Themes are reusable across multiple RunCode instances on the same page.

```js
RunCode.defineTheme('ocean', {
  '--rc-bg': '#0c4a6e',
  '--rc-primary': '#38bdf8',
  '--rc-text': '#bae6fd'
});

new RunCode({
  element: '.editor',
  theme: 'ocean',
  code: {
    html: '<h1>Ocean Theme</h1>'
  }
});
```

## Security

Restricts what the sandboxed preview iframe is allowed to do. Setting `network: false` blocks all outbound fetch and XHR requests via CSP. Setting `dialogs: false` suppresses `alert()`, `confirm()`, and `prompt()` calls. Use this when embedding untrusted or user-submitted code.

```js
new RunCode({
  element: '.secure',
  security: {
    network: false,
    dialogs: false
  },
  code: {
    js: 'fetch("/api")  // blocked by CSP'
  }
});
```

## All Options

A full configuration demonstrating every available option in one place. Use this as a reference template when building a custom RunCode integration. The `preview.debounce` value (in milliseconds) controls how long RunCode waits after the last keystroke before re-rendering the live preview.

```js
new RunCode({
  element: '.full',

  // UI and behavior
  theme: 'dark',
  clickToLoad: false,
  editable: true,

  // Which tab and panel are visible on load
  defaultTab: { editor: 'html', preview: true },

  // Live preview settings
  preview: {
    live: true,       // Re-render on every keystroke
    debounce: 500,    // Wait 500ms after last keystroke before re-rendering
    zoom: 1           // Preview iframe zoom level (1 = 100%)
  },

  // Sandbox security restrictions
  security: {
    network: false,   // Block all fetch/XHR requests
    dialogs: false    // Suppress alert(), confirm(), prompt()
  },

  // Initial code loaded into each tab
  code: {
    html: '<h1>Full Example</h1>',
    css: 'h1 { color: #38bdf8; }',
    js: 'console.log("full example");'
  }
});
```