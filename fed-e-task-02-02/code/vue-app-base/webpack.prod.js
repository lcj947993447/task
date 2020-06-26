const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const common = require("./webpack.common");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = merge(common, {
  mode: "production",
  module:{
	rules: [
		{
		  test: /\.vue$/,
		  loader: 'vue-loader',
		}
	  ],
  },
  plugins: [
    new webpack.DefinePlugin({
        // 值要求的是一个代码片段
        title: "Vue",
        BASE_URL: JSON.stringify("./public/"),
      }),
      new CleanWebpackPlugin(), 
      new CopyWebpackPlugin(["public"])
    ],
});
