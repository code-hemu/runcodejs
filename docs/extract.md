# Extract

The `extract` option reads code from existing DOM elements and assembles it into the editor.

## Source Items

Each item in `source.html`, `source.css`, or `source.js` is processed sequentially.

### Without target

Content is appended as-is to the result:

```js
{ selector: "#template" }
```

### With target + position

The `target` string is found in the accumulated result and transformed:

| Position | Effect |
|---|---|
| `replace` (default) | Replace target with content |
| `before` | Insert content before target |
| `after` | Insert content after target |
| `prepend` | Insert content right after target |
| `append` | Insert content right before target |

### Array selector

Multiple selectors are read and concatenated with newlines:

```js
{ selector: ["#header", "#content", "#footer"], target: "<!-- app -->", position: "replace" }
```

## Full Example

```html
<pre id="layout"><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Page&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;!-- app --&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

<pre id="header"><code>&lt;header&gt;Header&lt;/header&gt;</code></pre>
<pre id="content"><code>&lt;main&gt;Content&lt;/main&gt;</code></pre>
<pre id="footer"><code>&lt;footer&gt;Footer&lt;/footer&gt;</code></pre>
<pre id="scripts"><code>&lt;script src="app.js"&gt;&lt;/script&gt;</code></pre>

<script type="module">
import RunCode from 'runcode';

new RunCode({
  element: '.editor',
  extract: {
    source: {
      html: [
        { selector: "#layout" },
        { selector: ["#header", "#content", "#footer"], target: "<!-- app -->", position: "replace" },
        { selector: "#scripts", target: "</body>", position: "before" }
      ]
    }
  }
});
</script>
```

Result:

```html
<!DOCTYPE html>
<html>
<head><title>Page</title></head>
<body>
<header>Header</header>
<main>Content</main>
<footer>Footer</footer>
<script src="app.js"></script>
</body>
</html>
```
