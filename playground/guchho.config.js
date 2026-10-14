export default {
  build: {
    entry: 'index.html',
    outdir: 'dist',
    target: 'esnext',
    minify: false,
    pretty: true,
    minifyHtml: false,
    define: { __HOMEPAGE__: '"https://runcode.js.org/"' }
  },
};
