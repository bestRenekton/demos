# antd在线换肤定制功能

>最近react项目，用的antd框架，然后看见他的antdPro例子里面有个定制功能很帅，老大说做，那就做吧，鼓捣了一晚终于实现了。

+ 这里我的项目是在自己写的 [webpack4-react脚手架](https://www.yangyuetao.cn/#/detail/5b24eafd365d9c28a0eee643) 的基础上做修改的，如果你用的create-react-app或者其他的脚手架可能会有相应修改。
+ 安装`cnpm i antd-theme-generator --save`
+ index.html
	<!---->
		<body>
		    <link rel="stylesheet/less" type="text/css" href="static/color.less" />     //主要是这个起作用
		    <script>
		        window.less = {
		            async: false,
		            env: 'production'
		        };
		    </script>
		    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script>
		    <noscript>
		        You need to enable JavaScript to run this app.
		    </noscript>
		    <div id="root"></div>
		</body>
+ webpack.config.base.js **（不需要）**
	<!---->
	                {
	                    loader: 'less-loader', // compiles Less to CSS
	                    options: {
	                        modifyVars: {
	                            'primary-color': '#00375B',
	                            'link-color': '#00375B'
	                        },
	                        javascriptEnabled: true,
	                    },
	                }
+ package.json
	<!---->
		  "scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "dev": "node color &&  webpack-dev-server --config webpack.config.dev.js",      //每次自动node color
		    "start": "npm run dev",
		    "build": "node color && webpack --config webpack.config.prod.js"
		  },
+ index.js
	<!---->
		import 'antd/dist/antd.css';
+ 根目录添加color.js
	<!---->
		const path = require('path');
		const { generateTheme, getLessVars } = require('antd-theme-generator');
		
		const options = {
		  stylesDir: path.join(__dirname, './src/styles'),
		  antDir: path.join(__dirname, './node_modules/antd'),
		  varFile: path.join(__dirname, './src/styles/vars.less'),
		  mainLessFile: path.join(__dirname, './src/styles/main.less'),
		  themeVariables: [
		    '@primary-color',
		    '@secondary-color',
		    '@text-color',
		    '@text-color-secondary',
		    '@heading-color',
		    '@layout-body-background',
		    '@btn-primary-bg',
		    '@layout-header-background'
		  ],
		  indexFileName: 'index.html',
		  outputFilePath: path.join(__dirname, './src/static/color.less'),
		}
		
		generateTheme(options).then(less => {
		  console.log('Theme generated successfully');
		})
		  .catch(error => {
		    console.log('Error', error);
		  });
+ src添加styles文件夹，里面有
	+ vars.less
		<!---->
			@import "~antd/lib/style/themes/default.less";
			@link-color: #00375B;
			@primary-color: #00375B;
			:root { 
			    --PC: @primary-color;   //color.less中加入css原生变量：--PC
			 }
	+ main.less
		+ 可为空，只是为了不报错才引入

+ 使用
	<!---->
	    window.less
	      .modifyVars(
	        {
	          '@primary-color': '#ee5e7b',
	          '@link-color': '#ee5e7b',
			  '@btn-primary-bg': 'ee5e7b',
	        }
	      )
	      .then(() => { })
	      .catch(error => {
	        message.error(`Failed to update theme`);
	      });
+ 自己的CSS引入变量
	<!---->
		    span{
		        color: var(--PC);         //引入css原生变量：--PC
		    }