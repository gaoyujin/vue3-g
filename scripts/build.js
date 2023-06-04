// 进行打包 monerepo打包

// 1、 获取打包目录
import fs from "fs";
import path from "path";
import execa from "execa";
import { fileURLToPath } from "url";

const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);

const dirsPath = path.join(__dirnameNew, "../packages");
const dirs = fs.readdirSync(dirsPath).filter((p) => {
  if (!fs.statSync(`packages/${p}`).isDirectory()) {
    return false;
  }

  return true;
});

// 2、进行打包 ，打包多个文件夹，需要进行并行打包
async function build(target) {
  // 并行打包
  console.log(target, 3333);
  await execa("rollup", ["-c", "--environment", `TARGET:${target}`], {
    stdio: "inherit",
  });
}

function runParallel(dirs, buildFn) {
  // 遍历项目包
  let resultFns = [];
  for (let item of dirs) {
    resultFns.push(buildFn(item));
  }

  return Promise.all(resultFns); // 并行执行所有打包项目
}
// 执行打包
runParallel(dirs, build).then(() => {
  console.log("打包成功");
});
console.log(dirs);
