const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader 插件，它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',//指定打包文件
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader',
				],
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						esModule: false,
						limit: 1024, // 判断图片的大小   如果小于1024就会转换成base64
						name: '[name].[ext]' // 输出图片的名字  ext是扩展名
					},
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			// 值要求的是一个代码片段
			BASE_URL: JSON.stringify(path.resolve(__dirname, 'public')),
		}),
		// 用于生成 index.html
		new HtmlWebpackPlugin({
			title: 'Webpack Vue',
			meta: {
				viewport: 'width=device-width',
			},
			favicon: path.resolve(__dirname, 'public/favicon.ico'),
			template: path.resolve(__dirname, 'public/index.html'), //以当前目录下的index.html文件为模板生成dist/index.html文件
		}),
		new VueLoaderPlugin(),
	],
	resolve: { // 用来配置.vue文件内引用组件的处理 
		extensions: [
			'.vue', '.js'
		],
		modules: ["node_modules"],
		alias: {
			vue: 'vue/dist/vue.min.js',
			'@': path.join(__dirname, '.', 'src'), // 将@指向src目录下
			'@components': path.join(__dirname, '.', 'src/components')// 将组件引用指向src/components下
		}
	},
}
