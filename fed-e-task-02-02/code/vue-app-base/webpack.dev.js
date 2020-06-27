const path = require('path')
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    port: 8080,
  },
  devtool: "cheap-eval-module-source-map", // 错误追踪
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热替换
  ],
});
