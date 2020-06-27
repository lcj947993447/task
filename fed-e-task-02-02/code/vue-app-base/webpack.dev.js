const path = require('path')
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");


module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true, // disables Hot Reload
        },
      }
    ],
  },
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
