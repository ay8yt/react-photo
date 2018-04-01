const path = require("path");
const webpack = require("webpack");

module.exports = {
	mode : "development", //新版本webpack新增了mode模式，有development和productio两种环境
	entry: __dirname + '/src/main.js', //这是入口文件
	output: { //这是出口文件
		path: __dirname + '/dist', //从当前目录下，找到或生成一个dist目录
		filename: 'all.js' //打包后的文件名
	},
	devtool: "source-map", //生成map文件，用于在开发阶段浏览器调试工具中查看文件源代码
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [{
					loader: 'babel-loader',
					options: {
						//env表示将JS翻译为当前运行环境（目前浏览的运行环境为ES5）
						//react表示将React风格的JSX代码翻译为正常的JS
						presets: ['env','react'] 
					}
				}]
			},{
				test: /\.scss$/,
	          	use: [
	          		"style-loader", //"css-loader",
	          		{ 
	          			loader: 'css-loader', 
	          			options: { 
	          				modules : false, //开启CSS模块化，组件中CSS局部起效
	          				importLoaders: 1  //辅助postcss，让@import导入的css也可以增加兼容前缀
	          			} 
	          		},
	          		"postcss-loader",
	          		"sass-loader"]          	
			}
		]
	},
	watch: true,  //表示开启观察模式，一旦文件更改，webpack会自动重新构建, 开始服务器后，该属性自动设为true
	resolve: {
		alias: { //给路径起别名，加载组件时，路径写起来更方便
		  com: path.resolve(__dirname, 'src/components/') //举例： import App from 'com/App'
		}
	},
	devServer: {
		contentBase : __dirname+"/dist",
	    inline: true, //修改文件即时刷新浏览器
	    hot : true //完成模块的热替换
	},
	plugins:[
	    new webpack.HotModuleReplacementPlugin() //模块的热替换必须配合这个插件
	]
};