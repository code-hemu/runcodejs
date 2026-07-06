import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8")
);

function homepagePlugin() {
  return {
    name: 'homepage',
    transform(code) {
      return {
        code: code.replace(/__HOMEPAGE__/g, pkg.homepage),
        map: null
      }
    }
  }
}

function removeComment() {
  return {
    name: "remove-sourcemap-comment",
    writeBundle(outputOptions, bundle) {
      for (const fileName in bundle) {
        if (!fileName.endsWith(".js")) continue;

        const filePath = path.join(
          outputOptions.dir || path.dirname(outputOptions.file),
          fileName
        );

        let code = fs.readFileSync(filePath, "utf8");
        code = code.replace(/\/\/# sourceMappingURL=.*$/gm, "");
        fs.writeFileSync(filePath, code);
      }
    },
  };
}

const short_banner = `/*! ${pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author} and contributors | ${pkg.license} License */`;

const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author} and other contributors
*
* Released under the ${pkg.license} License
* Date: ${new Date().toISOString().split("T")[0]}
*/`;

function addBanner(text) {
  return {
    name: "add-banner",

    writeBundle(outputOptions, bundle) {
      for (const fileName in bundle) {
        if (!fileName.endsWith(".js")) continue;

        const filePath = path.join(
          outputOptions.dir || path.dirname(outputOptions.file),
          fileName
        );

        const code = fs.readFileSync(filePath, "utf8");

        fs.writeFileSync(filePath, `${text}\n${code}`);
      }
    },
  };
}

const resolveOptions = {
  browser: true,
  extensions: [".mjs", ".js", ".ts", ".json"],
};

const tsPlugin = typescript({
  tsconfig: "./tsconfig.json",
});

const sharedOutputOptions = {
  sourcemap: true,
  exports: "named",
  generatedCode: "es2015",
};

const plugins = [
  homepagePlugin(),
  resolve(resolveOptions),
  tsPlugin,
  removeComment(),
  addBanner(banner),
];

export default [
  {
    input: "src/index.ts",
    output: {
      ...sharedOutputOptions,
      file: "dist/runcode.esm.js",
      format: "esm",
    },
    plugins,
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    input: "src/index.ts",
    output: {
      ...sharedOutputOptions,
      exports: "default",
      file: "dist/runcode.cjs.js",
      format: "cjs",
    },
    plugins,
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    input: "src/index.ts",
    output: {
      ...sharedOutputOptions,
      exports: "default",
      file: "dist/runcode.js",
      format: "umd",
      name: "RunCode",
    },
    plugins,
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    input: "src/index.ts",
    output: {
      ...sharedOutputOptions,
      exports: "default",
      file: "dist/runcode.min.js",
      format: "umd",
      name: "RunCode",
    },
    plugins: [
      homepagePlugin(),
      resolve(resolveOptions),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      terser(),
      removeComment(),
      addBanner(short_banner),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [
      dts({
        respectExternal: true,
      }),
    ],
  },
];
