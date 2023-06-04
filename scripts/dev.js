// 进行打包 monerepo打包

// 1、 获取打包目录
import execa from "execa";

// 2、进行打包 ，打包多个文件夹，需要进行并行打包
async function build(target) {
  // 并行打包
  console.log(target, 3333);
  await execa("rollup", ["-cw", "--environment", `TARGET:${target}`], {
    stdio: "inherit",
  });
}

build("reactivity");
