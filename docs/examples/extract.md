# Extract Examples

## Basic - Concatenate Sources

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

## Replace Placeholder

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

## Insert Before / After

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

## Array Selector

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
