# Security

Exprify's preview iframe runs user-submitted code in an isolated environment. The `security` option gives you fine-grained control over what that code is allowed to do - preventing accidental or malicious access to network resources and native browser dialogs.


## Options

```js
security: {
  network: false,   // block all outbound network requests
  dialogs: false    // block alert / confirm / prompt dialogs
}
```

Both options default to `false`, meaning restrictions are active by default. You must explicitly pass `true` to unlock either capability.


## `network`

Controls whether user code inside the preview iframe can make outbound network requests.

**Default:** `false` (network is blocked)

When set to `false`, Exprify injects a `<meta http-equiv="Content-Security-Policy">` tag directly into the iframe document with the directive `connect-src 'none'`. This CSP rule instructs the browser to reject all of the following at the network level:

- `fetch()` calls
- `XMLHttpRequest` (XHR)
- `WebSocket` connections
- `EventSource` streams
- `navigator.sendBeacon()` requests

The block happens before any JavaScript executes - the browser itself enforces the restriction rather than a JavaScript override, making it significantly harder to bypass.

When set to `true`, no CSP meta tag is injected. User code may freely make outbound requests, subject to standard browser-enforced CORS policies. This is useful when building demos that intentionally call external APIs or load remote data.

```js
// Allow network access in the sandbox
new RunCode({
  security: {
    network: true
  }
})
```

> Use `network: true` only when you trust the code being executed, or when your use case explicitly requires live data fetching.


## `dialogs`

Controls whether user code can invoke native browser dialog functions: `alert`, `confirm`, and `prompt`.

**Default:** `false` (dialogs are suppressed)

When set to `false`, Exprify overrides `window.alert`, `window.confirm`, and `window.prompt` with silent no-op stubs before any user code runs. This means:

- `alert("hello")` does nothing and returns `undefined`
- `confirm("sure?")` does nothing and returns `undefined`
- `prompt("enter value")` does nothing and returns `undefined`

This prevents user code from freezing the browser tab with a blocking dialog, which would otherwise interrupt the entire page until the user manually dismisses it.

When set to `true`, the native dialog functions are left untouched. Code that calls `alert()` or `confirm()` will trigger real browser dialogs as expected. This may be appropriate in controlled environments where dialog-based interaction is part of the exercise.

```js
// Allow native dialogs in the sandbox
new RunCode({
  security: {
    dialogs: true
  }
})
```

## Using Both Together

You can configure `network` and `dialogs` independently of each other. Here is an example that enables both, fully unlocking the sandbox:

```js
new RunCode({
  security: {
    network: true,
    dialogs: true
  }
})
```

And the default restrictive configuration, which requires no explicit security block at all:

```js
// Equivalent to passing no security option
new RunCode({
  security: {
    network: false,
    dialogs: false
  }
})
```

## Security Model Summary

| Option | Default | Mechanism | Scope |
|---|---|---|---|
| `network` | `false` (blocked) | CSP `connect-src 'none'` meta tag | Browser-enforced, pre-execution |
| `dialogs` | `false` (suppressed) | `window` stub override | JavaScript-level, pre-execution |

Both restrictions are applied before user code executes, ensuring there is no window during which unsafe behavior can occur.