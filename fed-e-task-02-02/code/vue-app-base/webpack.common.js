const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader 插件，它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/main.js',
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
				use: ['vue-style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: ['vue-style-loader', 'css-loader', 'less-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'img',
						name: '[name].[ext]',
					},
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					hotReload: true, // disables Hot Reload
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			// 值要求的是一个代码片段
			BASE_URL: JSON.stringify('../public/'),
		}),
		// 用于生成 index.html
		new HtmlWebpackPlugin({
			title: 'Webpack Vue',
			meta: {
				viewport: 'width=device-width',
			},
			template: './public/index.html',
			filename: 'index.html',
		}),
		new VueLoaderPlugin(),
	],
	resolve: {
		// ** 在.vue文件中引入.vue文件时需要更改vue文件指向 ** 说明：node_modules/vue/dist/README.md
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': 'src',
		},
	},
}
