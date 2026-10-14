import dts from "@guchho/dts";
import banner from "@guchho/banner";


const HOMEPAGE = '"https://code-hemu.github.io/runcodejs/"';

const sharedOutputOptions = {
  entry: "src/index.ts",
  target: "esnext",
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  define: { __HOMEPAGE__: HOMEPAGE }
}

const longBanner = banner({
  style: "long",
  packageJson: "./package.json",
});

const shortBanner = banner({
  style: "short",
  packageJson: "./package.json",
});

export default [
  {
    build: {
      ...sharedOutputOptions,
      outfile: "dist/runcode.esm.js",
      format: "esm",
      exports: "named",
      minify: false
      
    },
    plugins: [
      longBanner,
      dts({
        entry: "src/index.ts",
        outfile: "dist/index.d.ts",
        respectExternal: true
      })
    ]
  },
  {
    build: {
      ...sharedOutputOptions,
      outfile: "dist/runcode.cjs.js",
      format: "cjs",
      exports: "default",
      minify: false
    },
    plugins: [
      longBanner,
    ]
  },
  {
    build: {
      ...sharedOutputOptions,
      outfile: "dist/runcode.js",
      format: "umd",
      name: "RunCode",
      exports: "default",
      minify: false
    },
    plugins: [
      longBanner,
    ]
  },
  {
    build: {
      ...sharedOutputOptions,
      outfile: "dist/runcode.min.js",
      format: "umd",
      name: "RunCode",
      exports: "default",
      minify: true
    },
    plugins: [
      shortBanner
    ]
  }
];
