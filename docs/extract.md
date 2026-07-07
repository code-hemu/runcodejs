# Extract

The `extract` option lets you pull code from existing DOM elements on the page and assemble it
into the editor automatically. This is useful when your demo code is already embedded in the
page - for example, inside `<pre>` or `<template>` tags - and you want the editor to reflect
that code without duplicating it manually.


## How It Works

When `extract` is configured, RunCode reads the specified DOM elements in order, collects their
text content, and builds up an assembled string for each language channel (`html`, `css`, `js`).
Each entry in the source array is processed sequentially, and the result of each step feeds into
the next - making it possible to compose a complete document from multiple fragments.


## Source Items

Each item in `source.html`, `source.css`, or `source.js` describes one fragment to collect.
Items are processed in the order they appear in the array.

### Without `target`

When no `target` is specified, the content of the selected element is simply appended to the
end of the accumulated result. Use this for fragments that belong at the top level or wherever
the current result ends.

```js
{ selector: "#template" }
```

This reads the inner text of `#template` and concatenates it to whatever has been built so far.


### With `target` and `position`

When a `target` string is provided, RunCode finds that exact string inside the accumulated
result and transforms it using the selected fragment. The `position` field controls how the
insertion is made relative to the target string.

| Position | Effect |
|---|---|
| `replace` (default) | Removes the target string and puts the content in its place |
| `before` | Inserts the content immediately before the target string, leaving target intact |
| `after` | Inserts the content immediately after the target string, leaving target intact |
| `prepend` | Inserts the content right after the opening of the target string |
| `append` | Inserts the content right before the closing of the target string |

If `position` is omitted, `replace` is used by default.


### Multiple Selectors & Multiple Matches

The `selector` field accepts either a single CSS selector string or an array of selector
strings. All elements matching **each** selector are read in order and their contents are
joined with newlines before the result is applied to the target. This means a selector like
`"pre.language-markup code"` will collect content from **every** matching `<code>` element,
not just the first one.

Passing an array of selectors lets you combine multiple separate fragments — such as a header,
main content, and footer — into a single insertion step.

```js
{
  selector: ["#header", "#content", "#footer"],
  target: "<!-- app -->",
  position: "replace"
}
```

The combined text of `#header`, `#content`, and `#footer` replaces the `<!-- app -->` placeholder
in the accumulated HTML.


## Full Example

The following example demonstrates a complete extract configuration. The HTML document structure
is stored in one element, and individual page sections are stored in separate elements. RunCode
assembles them into a single coherent HTML document inside the editor.

### DOM Elements

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
```

### RunCode Configuration

```js
import RunCode from 'runcode';

new RunCode({
  element: '.editor',
  extract: {
    source: {
      html: [
        // Step 1: Load the base layout as the starting point
        { selector: "#layout" },

        // Step 2: Replace the <!-- app --> placeholder with the three page sections
        {
          selector: ["#header", "#content", "#footer"],
          target: "<!-- app -->",
          position: "replace"
        },

        // Step 3: Insert the script tag just before the closing </body>
        {
          selector: "#scripts",
          target: "</body>",
          position: "before"
        }
      ]
    }
  }
});
```

### Assembled Result

After all three steps run in sequence, the editor receives the following complete HTML document:

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

Each step builds on the previous one: the layout is loaded first, the page sections fill in
the placeholder, and the script tag is inserted just before `</body>` closes - resulting in a
fully assembled document without any manual duplication.