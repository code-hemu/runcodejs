# Security Examples

## Block All Network Requests (Default)

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

## Allow Network Requests

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

## Disable Dialogs (Default)

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

## Allow Dialogs

```js
new RunCode({
  element: '.editor',
  security: { dialogs: true },
  code: {
    js: 'alert("This will show");'
  }
});
```
