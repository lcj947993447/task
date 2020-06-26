#### 1.Webpack

##### 构建流程环节

entry: 模块入口，指示webpack从哪个模块开始构建内部依赖图

output: 模块出口，指示webpack在哪输出创建的打包后的文件，以及如何命名

module: 处理规则集合（即loader集合），指示webpack根据相应的规则处理各种类型的模块

rosolve: 模块解析规则，指示webpack查找模块规则，如绝对路径，相对路径，有无后缀名，loader解析规则

plugin: 插件集合，指示webpack优化或者解决loader处理过后或无法处理的事情，拓展webpack

devServer: DevServer, 通过配置的方式实现本地http服务以及代理，静态数据加载，HRM热更新，source map调试等

##### 打包过程

webpack启动后，从entry开始，根据rosolve规则递归查找entry依赖的所有module，在查找过程中将查找到的module根据module.rules配置的loader规则进行转换处理，转换处理期间webpack会根据plugin中配置的插件进行优化，当前模块处理优化完成后，继续递归解析，当全部模块处理完成后，将处理后的代码合并成文件根据output定义的规则输出到相应的位置。





#### 2.loader和plugin

loader: webpack工作的核心机制，主要用来在加载时根据模块文件类型使用对应的规则进行编译转换和加载

plugin: webpack工作的支柱功能，主要用于解决 loader 无法实现的事情，工作范围更广。 



##### 不同点

​	loader:

​		1.不需要在webpack.config.js中导入

​		2.在module.rules中直接配置

​		3.通过options定义规则

​		4.在加载模块时工作

​		5.返回一个函数

​	plugin:

​		1.需要在webpack.config.js中导入

​		2.在plugins中通过new的方式调用

​		3.通过传入参数的方式定义规则

​		4.钩子机制，webpack在每个环节预埋了钩子，通过挂载到钩子上工作

​		5.必须是一个函数或者包含apply方法的对象

##### 开发思路

​	loader: module.exports导出一个函数 ，函数接收一个参数（source：加载到的资源），在函数内部对source进行处理，return资源处理过后的结果

​	module.exports = source => {

​		// source 处理过程

​		const  resultContent =  处理过后的结果

​		return resultContent 

​	}



​	plugin: 定义一个类型，通过类型的apply方法使用，apply接受一个compiler对象参数（包含webpack启动时所有的配置信息），通过compiler.hooks.xxx(钩子名称).tap注册一个函数，接收两个参数（插件名称，处理函数)，处理函数接收一个参数（compilation打包的上下文）,使用for in 遍历compilation.assets 拿到所有的资源文件信息，通过source()方法拿到文件内容，对拿到的文件内容进行处理，最后通过source()将处理后的结果暴露出去

​	class MyPlugin {

​		apply (compiler)	{

​			compiler.hooks.xxx.tap('MyPlugin ', compilation => {

​				// compilation  => 此次打包的上下文（所有打包过程中产生的结果）

​				for( const name in compilation.assets) {

​				    // 根据需求定义判断条件拿到需要修改的文件 compilation.assets[name]

​					// 通过source()拿到值对应的文件的内容compilation.assets[name].source()

​					// 对文件内容进行处理 xxx

​					// const resultContent =  处理过后的结果

​					// 最后暴露一个source()方法返回处理过后的结果

​					compilation.assets[name] = {

​						source: () => resultContent

​					}

​				}

​			})

​		}

​	}

