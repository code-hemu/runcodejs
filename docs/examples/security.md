# Security Examples

The `security` option in RunCode controls what user code is allowed to do inside the preview
iframe. By default, potentially dangerous behaviors - such as outbound network requests and
browser dialogs - are blocked to keep sandboxed code safe and predictable. Each behavior can
be explicitly opted in or out depending on your use case.


## Block All Network Requests (Default)

By default, `network` is set to `false`, which prevents any outbound HTTP or WebSocket
connections from inside the code preview. Calls to `fetch()`, `XMLHttpRequest`, or any other
network API will be intercepted and rejected. This is the safest setting for untrusted or
user-submitted code.

```js
new RunCode({
  element: '.editor',
  security: { network: false },
  code: {
    js: `
      fetch('https://api.example.com')
        .then(r => r.json())
        .catch(e => console.log('Blocked:', e));
    `
  }
});
```

The `catch` handler will fire immediately, logging the blocked error message to the console.
No actual request ever leaves the sandbox.


## Allow Network Requests

Setting `network: true` lifts the restriction and allows code running inside the preview to
make real HTTP requests to external URLs. This is useful for demos that depend on live API
data, such as fetching from public REST endpoints or loading external resources.

```js
new RunCode({
  element: '.editor',
  security: { network: true },
  code: {
    js: `
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(r => r.json())
        .then(d => console.log(d));
    `
  }
});
```

Use this setting only when you trust the code being executed, as it grants full access to
external network communication from inside the iframe.


## Disable Dialogs (Default)

By default, `dialogs` is set to `false`, which silently overrides the native browser dialog
functions - `alert()`, `confirm()`, and `prompt()` - with no-op stubs. This prevents code
from freezing the page by popping up modal dialogs that block UI interaction.

```js
new RunCode({
  element: '.editor',
  security: { dialogs: false },
  code: {
    js: 'alert("This will not show");'
    // alert() is overridden with a no-op
  }
});
```

The call to `alert()` completes without throwing an error, but no dialog box appears. This
keeps the editor experience smooth and uninterrupted.


## Allow Dialogs

Setting `dialogs: true` restores the native browser dialog functions inside the preview
iframe. When code calls `alert()`, `confirm()`, or `prompt()`, the browser will display the
actual dialog box. This is appropriate when demonstrating or teaching browser dialog behavior
directly.

```js
new RunCode({
  element: '.editor',
  security: { dialogs: true },
  code: {
    js: 'alert("This will show");'
  }
});
```

Keep in mind that modal dialogs block all JavaScript execution until dismissed, so enabling
this in an interactive playground may briefly freeze the preview until the user closes the
dialog.


## Combining Options

Both `network` and `dialogs` can be configured together in a single `security` object.
Options that are not specified fall back to their defaults (`false` for both).

```js
new RunCode({
  element: '.editor',
  security: {
    network: true,
    dialogs: false
  },
  code: {
    js: `
      fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(r => r.json())
        .then(d => console.log(d.title));

      alert("This will not appear");
    `
  }
});
```

In this setup, network requests are permitted while dialogs remain suppressed - a common
pattern for API-driven demos where dialog interruptions would be disruptive.