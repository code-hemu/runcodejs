# Theme Examples

## Built-in Themes

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

## Switch at Runtime

```js
const editor = new RunCode({
  element: '.editor',
  theme: 'dark'
});

// Later
editor.setTheme('light');
```

## Custom Theme

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

## Extend a Built-in Theme

```js
// Extend 'light' instead of 'dark'
RunCode.defineTheme('custom-light', {
  '--rc-primary': '#ff6347'
}, 'light');
```
