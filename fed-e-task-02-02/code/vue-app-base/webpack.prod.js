const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const common = require("./webpack.common");

// const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css 使用link导入 css将不会被压缩
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
// const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩js

module.exports = merge(common, {
  mode: "production",
  output: {
		filename: '[name]-[contenthash:8].min.js',
  },
  // optimization: { 
		// 优化功能管理集合 便于管理
		// 只有在生产环境时会自动工作  并启动 minimizer 中的配置
		// minimizer: [ // webpack检测到时会停用默认压缩   使用配置文件中的压缩配置  
			// new OptimizeCssAssetsWebpackPlugin(
				// filename: '[name]-[contenthash:8].min.css' // 设置hash值 
			// ) // 缺点：会导致JS不压缩
			// new TerserWebpackPlugin() // js 配置压缩
		// ]
	// },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
      // {
			// 	test: /\.css$/, // MiniCssExtractPlugin.loader 使用
			// 	use: [
			// 		'vue-style-loader',
			// 		'css-loader',
			// 	],
			// },
			// {
			// 	test: /\.less$/,
			// 	use: [
			// 		'vue-style-loader', // MiniCssExtractPlugin.loader 使用
			// 		'css-loader',
			// 		'less-loader',
			// 	],
			// },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(["public"]),
    // new MiniCssExtractPlugin(),// css体积过大  150KB link方式导入 不会压缩CSS文件 需要配合optimize-css-assets-webpack-plugin(压缩文件)
  ],
});
