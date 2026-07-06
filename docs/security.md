# Security

Control what user code in the preview iframe is allowed to do.

## Options

```js
security: {
  network: false,   // block fetch/XHR/WebSocket
  dialogs: false    // block alert/confirm/prompt
}
```

### network

When `false` (default), a CSP `<meta>` tag with `connect-src 'none'` is injected into the iframe, blocking all network requests (`fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon`).

When `true`, no CSP restriction is applied and network requests are allowed (subject to browser CORS policies).

### dialogs

When `false` (default), `window.alert`, `window.confirm`, and `window.prompt` are overridden with no-op stubs before user code executes.

When `true`, native dialog functions are left intact.

## Usage

```js
new RunCode({
  security: {
    network: true,
    dialogs: true
  }
})
```
