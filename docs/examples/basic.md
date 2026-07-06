# Basic Examples

## Minimal

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

```js
new RunCode({
  element: '.editor-only',
  defaultTab: { editor: 'html', preview: false }
});
```

## clickToLoad

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

## With Custom Theme

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

## With Security

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

```js
new RunCode({
  element: '.full',
  theme: 'dark',
  clickToLoad: false,
  editable: true,
  defaultTab: { editor: 'html', preview: true },
  preview: { live: true, debounce: 500, zoom: 1 },
  security: { network: false, dialogs: false },
  code: {
    html: '<h1>Full Example</h1>',
    css: 'h1 { color: #38bdf8; }',
    js: 'console.log("full example");'
  }
});
```
