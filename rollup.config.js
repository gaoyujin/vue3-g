// 通过 rollup 进行打包

// 1、引入相关的依赖
import ts from "rollup-plugin-typescript2"; // 解析 ts
import json from "@rollup/plugin-json"; // 解析json
import resolvePlugin from "@rollup/plugin-node-resolve"; // 解析 第三方依赖
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "node:module";

const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);
const require = createRequire(import.meta.url);

// 2、 获取路径
let packagesDir = path.resolve(__dirnameNew, "packages"); // 获取所有项目所在路径
// 2.1 获取需要打包的 项目
const packageDir = path.resolve(packagesDir, process.env.TARGET);
// 2.2
const resolve = (p) => path.resolve(packageDir, p);
console.log(resolve, 7777);
const pkg = require(resolve(`package.json`));
const packageOptions = pkg.buildOptions || {};
const name = path.basename(packageDir);

// 3 创建一个表
const outputOptions = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: "iife",
  },
};

const options = pkg.buildOptions;
// rollup 需要导出一个配置
function createConfig(format, output) {
  // 进行打包
  output.name = options.name;
  output.sourcemap = true;
  // 生成rollup的配置
  return {
    input: resolve("src/index.ts"),
    output,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirnameNew, "tsconfig.json"),
      }),
      resolvePlugin(),
    ],
  };
}

export default options.formats.map((format) =>
  createConfig(format, outputOptions[format])
);
