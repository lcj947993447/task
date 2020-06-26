# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性


1.安装vue-loader和vue-template-compiler后报错
    vue-loader requires @vue/compiler-sfc to be present in the dependency tree.
    把安装版本改为15.9.2的  npm i -D vue-loader@15.9.2
2.Cannot find module '@babel/core'
    babel-core的版本不对
    babel-loader 8 对应的 babel-core版本为：7
    解决办法：卸载babel-core重新安装
3.Cannot find module '@vue/cli-plugin-babel/preset' from xxxxx
    安装@vue/cli-plugin-babel/preset
