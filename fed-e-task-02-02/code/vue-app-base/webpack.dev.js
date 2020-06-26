const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = merge(common, {
  mode: "development",
  devServer: {
	contentBase: "dist",
    hot: true,
    open: true,
  },
  devtool: "cheap-eval-module-source-map", // 错误追踪
  plugins: [
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(), // 热替换
  ],
});
