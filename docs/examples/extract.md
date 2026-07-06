# Extract Examples

The `extract` option lets you pull source code from existing elements on the page and compose them into a unified editor source. This is useful for documentation pages where HTML, CSS, or JS snippets are displayed separately as code blocks but need to run together as a single demo.

Each language key (`html`, `js`, `css`) accepts an array of extract entries. The first entry is always the base source. Subsequent entries are merged into that base using a `target` string and a `position` strategy.


## Basic - Concatenate Sources

The simplest usage: provide one or more selectors per language. Exprify reads the text content of each matched element and concatenates them in order to form the final source for that language tab.

```html
<pre id="html-part"><code>&lt;h1&gt;Title&lt;/h1&gt;</code></pre>
<pre id="js-part"><code>console.log("extracted");</code></pre>

<script type="module">
new RunCode({
  element: '.editor',
  extract: {
    source: {
      html: [{ selector: "#html-part" }],
      js: [{ selector: "#js-part" }]
    }
  }
});
</script>
```

When no `target` or `position` is set, the extracted content is simply appended to whatever has already been collected from previous entries in the array.

## Replace Placeholder

Use `position: "replace"` to substitute a placeholder string inside the base source with content from another element. This is ideal when your base template contains comment markers that act as named insertion points.

```html
<pre id="template"><code>&lt;div id="root"&gt;&lt;!-- content --&gt;&lt;/div&gt;</code></pre>
<pre id="content"><code>&lt;p&gt;Inserted content&lt;/p&gt;</code></pre>

<script type="module">
new RunCode({
  element: '.editor',
  extract: {
    source: {
      html: [
        { selector: "#template" },
        { selector: "#content", target: "<!-- content -->", position: "replace" }
      ]
    }
  }
});
</script>
```

The `target` value is matched as a plain substring within the accumulated source. The first match is replaced with the extracted content. If the target string is not found, the extracted content is ignored.


## Insert Before / After

Use `position: "before"` or `position: "after"` to inject content adjacent to a target string without removing it. This is useful for wrapping existing markup with a header, footer, or wrapper element.

```html
<pre id="page"><code>&lt;body&gt;&lt;/body&gt;</code></pre>
<pre id="header"><code>&lt;header&gt;Header&lt;/header&gt;</code></pre>
<pre id="footer"><code>&lt;footer&gt;Footer&lt;/footer&gt;</code></pre>

<script type="module">
new RunCode({
  element: '.editor',
  extract: {
    source: {
      html: [
        { selector: "#page" },
        { selector: "#header", target: "<body>", position: "after" },
        { selector: "#footer", target: "</body>", position: "before" }
      ]
    }
  }
});
</script>
```

The three position strategies and their behavior:

| Position | Behavior |
|---|---|
| `"replace"` | Removes the target string and puts the extracted content in its place |
| `"after"` | Keeps the target string and inserts the extracted content immediately after it |
| `"before"` | Keeps the target string and inserts the extracted content immediately before it |


## Array Selector

The `selector` field also accepts an array of CSS selectors. All matched elements are extracted in order and concatenated before being applied to the target. This allows multiple independent snippets to be merged into a single insertion point without needing a separate entry for each one.

```html
<pre id="part-a"><code>Part A</code></pre>
<pre id="part-b"><code>Part B</code></pre>
<pre id="part-c"><code>Part C</code></pre>
<pre id="shell"><code>&lt;!-- parts --&gt;</code></pre>

<script type="module">
new RunCode({
  element: '.editor',
  extract: {
    source: {
      html: [
        { selector: "#shell" },
        { selector: ["#part-a", "#part-b", "#part-c"], target: "<!-- parts -->", position: "replace" }
      ]
    }
  }
});
</script>
```

The extracted content from `#part-a`, `#part-b`, and `#part-c` is joined in array order, then the combined result replaces the `<!-- parts -->` placeholder in `#shell`.


## Summary

| Field | Type | Description |
|---|---|---|
| `selector` | `string` or `string[]` | CSS selector(s) to extract source text from |
| `target` | `string` | Substring in the accumulated source to insert relative to |
| `position` | `"replace"` / `"before"` / `"after"` | How the extracted content is merged at the target location |

If `target` and `position` are both omitted, the extracted content is concatenated directly to the end of the accumulated source for that language.