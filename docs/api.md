# API Reference

A complete reference for configuring, controlling, and extending the RunCode playground.


## Options

These options are passed to the RunCode constructor to configure the playground at creation time.

| Option | Type | Default | Description |
|---|---|---|---|
| `element` | `string \| HTMLElement` | `'.rc-container'` | A CSS selector string or a direct DOM element reference where the playground will be mounted. If the element is not found, initialization will silently fail. |
| `theme` | `string` | `'dark'` | The visual color scheme of the editor. Five themes are built in: `light`, `dark`, `dracula`, `monokai`, and `nord`. Custom themes can be registered with `RunCode.defineTheme()`. |
| `clickToLoad` | `boolean` | `false` | When enabled, the playground renders a static code preview on load with a "Run" overlay button. The code does not execute until the user clicks that button. Useful for performance-sensitive pages with many embeds. |
| `editable` | `boolean` | `true` | Controls whether the editor panels accept user input. Set to `false` to render a read-only code display with live preview, such as in documentation or demos. |
| `code` | `{ html?, css?, js? }` | - | Seed the editor tabs with initial code on mount. Any combination of `html`, `css`, and `js` keys may be provided; omitted keys default to empty. |
| `defaultTab` | `string \| DefaultTabConfig` | `{ editor: 'html', preview: true }` | Controls which editor tab is active and whether the preview panel is visible when the playground first renders. Accepts either a shorthand tab name string or a full `DefaultTabConfig` object. |
| `preview` | `PreviewConfig` | `{ live: true, debounce: 300, zoom: 1 }` | Configures how the preview panel behaves - whether it updates automatically on keystrokes, how long to wait before re-executing, and the zoom scale applied to the output frame. |
| `security` | `SecurityConfig` | `{ network: false, dialogs: false }` | Restricts what the sandboxed preview iframe is permitted to do. By default, network access and browser dialogs are both blocked to prevent unintended side effects. |
| `extract` | `ExtractConfig` | - | Instructs the playground to pull initial code from existing DOM elements rather than from the `code` option. Useful for progressively enhancing static code blocks already on the page. |


### DefaultTabConfig

Fine-grained control over the initial tab and panel state when the playground first renders.

| Option | Type | Default | Description |
|---|---|---|---|
| `editor` | `'html' \| 'css' \| 'js' \| null` | `'html'` | Which editor tab is focused on load. Passing `null` collapses the entire editor panel, showing only the preview - useful for output-only embeds. |
| `preview` | `boolean` | `true` | Whether the preview panel is visible on load. Set to `false` to start with an editor-only view, for instance when walking users through code before they run it. |


### PreviewConfig

Controls the behavior of the live output iframe.

| Option | Type | Default | Description |
|---|---|---|---|
| `live` | `boolean` | `true` | When `true`, the preview re-executes automatically as the user types. When `false`, the user must manually trigger execution via the Run button or the `runCode()` method. |
| `debounce` | `number` | `1000` | How long to wait (in milliseconds) after the last keystroke before the preview refreshes. Higher values reduce CPU usage on complex or long-running snippets; lower values feel more responsive for simple output. |
| `zoom` | `number` | `1` | Scales the preview iframe content using CSS `transform: scale()`. Supported values are `0.25`, `0.5`, and `1`. Useful when the preview renders at a larger intrinsic size than the container. |


### SecurityConfig

Controls the sandbox permissions applied to the preview iframe. Both options default to `false` to provide a safe baseline. Enable them only if your use case explicitly requires it.

| Option | Type | Default | Description |
|---|---|---|---|
| `network` | `boolean` | `false` | Allows the preview iframe to make outbound HTTP requests via `fetch`, `XMLHttpRequest`, or `WebSocket`. When `false`, all network access is blocked by the iframe sandbox policy. |
| `dialogs` | `boolean` | `false` | Allows the preview iframe to call `alert()`, `confirm()`, and `prompt()`. When `false`, these calls are silently suppressed to prevent the host page from being blocked by modal dialogs. |


## Methods

Instance methods available on an initialized RunCode playground object.

| Method | Description |
|---|---|
| `init()` | Bootstraps the playground - builds the DOM, attaches event listeners, and renders the initial preview. Called automatically on instantiation; only call this manually if you destroyed and need to re-initialize the same instance. |
| `runCode()` | Programmatically triggers a full code execution cycle, refreshing the preview with the current editor contents. Use this when `live` is set to `false` or when you need to force a re-run from outside the editor. |
| `setTheme(name)` | Switches the active theme at runtime without re-initializing the playground. Accepts any built-in theme name or the name of a custom theme previously registered with `RunCode.defineTheme()`. |
| `destroy()` | Fully tears down the playground instance - removes all DOM nodes injected by RunCode, unbinds event listeners, and releases internal references. Call this before removing the container element or navigating away in a single-page app. |


## Static Methods

Methods on the `RunCode` class itself, available without an instance.

| Method | Description |
|---|---|
| `RunCode.defineTheme(name, colors, base?)` | Registers a custom theme globally. `name` is the identifier used in `theme` or `setTheme()`. `colors` is an object mapping semantic token names to color values. The optional `base` parameter specifies an existing built-in theme to inherit unspecified tokens from, defaulting to `dark`. Themes registered here are available to all RunCode instances on the page. |


## Types

Type definitions for advanced configuration objects.

```ts
// Describes a single extraction rule: which DOM element(s) to read code from,
// which editor tab to inject the result into, and where to place it relative
// to any code already present in that tab.
ExtractSourceItem {
  selector: string | string[]   // One or more CSS selectors targeting source elements
  target?: string               // Editor tab to inject into: 'html', 'css', or 'js'
  position?: 'replace'          // Overwrites any existing content in the target tab
            | 'before'          // Inserts extracted code above existing content
            | 'after'           // Inserts extracted code below existing content
            | 'prepend'         // Inserts at the very top of the target tab
            | 'append'          // Inserts at the very bottom of the target tab
}

// Top-level extract configuration passed as the `extract` option.
// Each key maps to a list of extraction rules for that editor tab.
ExtractSource {
  html?: ExtractSourceItem[]
  css?: ExtractSourceItem[]
  js?: ExtractSourceItem[]
}
```
