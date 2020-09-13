# webpack 概述

> webpack 是一个现代 javascript 应用程序的 **静态模块打包器 (module bundler)**

[webpack官网](https://webpack.js.org/)



## webpack 能做什么

webpack是一个静态模块打包器

1. 语法转换
   + less/sass转换成css
   + ES6转换成ES5
   + typescript转换成js
2. html/css/js 代码压缩合并 (打包)
3. webpack可以在开发期间提供一个开发环境
   + 自动开启浏览器
   + 自动监视文件变化
   + 自动刷新浏览器
4. 项目一般先打包再上线





## webpack 的模块的说明

在 webpack 中, 一切的静态资源都称之为模块   (html/css/js/图片..)

- css
- js
- 图片
- 字体图标



webpack还兼容所有的模块化语法:

 	1. nodejs中, commonjs
 	2. 浏览器中, seajs  和  requirejs
 	3. es6 中新增的模块化语法 

可以在浏览器中使用 commonjs 规范





# webpack 的基本使用

## webpack打包的基本步骤

1. 建目录 dist,  src/main.js

2. 初始化:

   ```
   yarn  init   -y
   ```

3. 安装包: 

   ```
   yarn  add webpack  webpack-cli
   ```

4. 配置scripts

   ```
   "scripts": {
   	"build": "webpack ./src/main.js -o ./dist/bundle.js"
   },
   ```

5. npm run build 打包





## npm中 --save和 --save-dev的区别

1. --save  简写-S: 将安装包作为项目的依赖  (**目前为默认值**)  

   早期的 npm 安装包的时候, 必须加上 --save 才会添加到 package.json 项目依赖中去

2. --save-dev  简写 -D: 将安装包作为开发阶段的依赖

**tips:**

- dependences:  项目依赖, 项目上线也要用的
- devDependencies: 开发依赖, 只在开发中使用, 上线时不要用的

**注意点: yarn add jquery -D;   yarn只认识 -D**





## npm中scripts的使用

在package.json文件中, 可以配置 scripts ...  配置自己的命令

```
"scripts": {
	"pp": "yarn add jquery"
}

```

**运行方式:  npm  run  xx**

特殊的命令:  start / stop  可以省略 run

```
npm run start  => npm start
npm run stop  => npm stop
```

使用 yarn 直接不需要加 run  

```
npm run pp  =>  yarn pp
npm run build => yarn build
```







## webpack配置到配置文件中

1. 建目录  dist    src/main.js

2. 初始化

   ```
   yarn init -y
   ```

3. 安装依赖包

   ```
   yarn add webpack  webpack-cli  -D
   ```

4. 配置scripts 

   ```js
   scripts: {
   	"build": "webpack --config webpack.config.js"
   }
   ```

   `--config  webpack.config.js` 这个配置文件名为默认值, 不加也会默认找这个文件

5. 提供 webpack.config.js 

   参考文档:   [https://webpack.docschina.org/concepts/#入口-entry-](https://webpack.docschina.org/concepts/#入口-entry-) 

   ```js
   const path = require('path')
   
   module.exports = {
     // entry: 配置入口文件 (从哪个文件开始打包)
     entry: './src/main.js',
   
     // output: 配置输出 (打包到哪去)
     output: {
       // 打包输出的目录 (必须是绝对路径)
       path: path.join(__dirname, 'dist'),
       // 打包生成的文件名
       filename: 'bundle.js'
     },
   
     // 打包模式 production 压缩/development 不压缩
     mode: 'development'
   }
   ```

小测试:

​	假定在main.js中导入一个  aa.js,  多个文件需要打包, wepack会打包成一个文件, 可以节约请求的次数

```js
require('./aa.js')
console.log('这是main模块')
```







## 基于 webpack 实现隔行变色

- 新建  public/index.html 编写代码

![image-20191126112505518](assets/image-20191126112505518.png)

- 在 index.html 中新建一些 li 玩玩

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
  
  <div id="app">
    <!-- ul>li{我是第$个li}*10 -->
    <ul>
      <li>我是第1个li</li>
      <li>我是第2个li</li>
      <li>我是第3个li</li>
      <li>我是第4个li</li>
      <li>我是第5个li</li>
      <li>我是第6个li</li>
      <li>我是第7个li</li>
      <li>我是第8个li</li>
      <li>我是第9个li</li>
    </ul>
  </div>
  
  <script src="../dist/bundle.js"></script>
  </body>
  </html>
  ```

需求:

1. **使用 jquery 隔行变色**

   安装jquery

   ```
   yarn add jquery
   ```

   `main.js`

   ```js
   // 需求: 通过jquery实现隔行变色
   const $ = require('jquery')
   $(function() {
     $('#app li:nth-child(odd)').css('color', 'red')
     $('#app li:nth-child(even)').css('color', 'green')
   })
   ```

   

2. **让最后一行的文字变成当前日期**

   安装 moment

   ```
   yarn add moment
   ```

   `main.js`

   ```js
   // 需求: 通过jquery实现隔行变色
   const $ = require('jquery')
   const moment = require('moment')
   
   $(function() {
     $('#app li:nth-child(odd)').css('color', 'red')
     $('#app li:nth-child(even)').css('color', 'green')
   
     $('#app li:last-child').text(moment().format('YYYY年MM月DD日'))
   })
   ```

   





## 自动生成html - html-webpack-plugin插件

目前我们都是在 index.html 中手动引入打包后的资源，这种引入方式是有缺点的

比如: 文件名依赖问题，`假如 webpack 配置中的输出文件名修改了，需要及时在 index.html 中同步修改`

  1. 下载

     ```
     yarn add html-webpack-plugin  -D
     ```

  2.  **在`webpack.config.js`文件中，引入这个模块** :

     ```js
     // 引入自动生成 html 的插件
     const HtmlWebpackPlugin = require('html-webpack-plugin')
     ```

  3. 配置

     ```js
     plugins: [
       new HtmlWebpackPlugin({ template: './public/index.html' })
     ]
     ```

> 配置好了之后, public 目录的 index.html 就不需要引入打包后的文件了, 会自动被插件生成 html 引入

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

<div id="app">
  <!-- ul>li{我是第$个li}*10 -->
  <ul>
    <li>我是第1个li</li>
    <li>我是第2个li</li>
    <li>我是第3个li</li>
    <li>我是第4个li</li>
    <li>我是第5个li</li>
    <li>我是第6个li</li>
    <li>我是第7个li</li>
    <li>我是第8个li</li>
    <li>我是第9个li</li>
  </ul>
</div>

<!-- 打包后的文件会被自动引入, 不需要引入了 -->
</body>
</html>
```



 



# webpack - loaders 的配置

webpack默认只认识 js 文件, 但是webpack 可以使用 [loader](https://www.webpackjs.com/concepts/loaders) 来加载预处理文件, 允许webpack也可以打包 js之外的静态资源。

所以webpack如果要处理其他文件类型, **记得要先配置对应的 loader**



## webpack中处理 css 文件

需求: 去掉小圆点, 新建 css 目录

1. 安装

   ```
   yarn add style-loader css-loader -D
   ```

2. 配置

   ```js
   module: {
     // loader的规则
     rules: [
       {
         // 正则表达式，用于匹配所有的css文件
         test: /\.css$/,
         // 使用什么样的loader进行解析
         use: [ "style-loader", "css-loader"]
       }
     ]
   },
   ```

   



##  分离 css 文件

我们上面的操作，使得`css`和`js`文件混杂在一起了，一个文件请求次数是少了

但是如果文件太大的话，也不是太好，那有没有什么办法把`css`分离出来呢？ 

- 有一个插件，`mini-css-extract-plugin`，这个插件支持`webpack4.x`

- 还有一个插件`extract-text-webpack-plugin`这个插件对`webpack3.x`的版本支持，被`webpack4.x`废弃了 (所以没用了)

1. 安装依赖包

   ```
   yarn add mini-css-extract-plugin -D
   ```

2.  **在`webpack.config.js`文件中，引入这个模块** 

   ```js
   // 引入分离 css 文件的 模块
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   ```

3. 配置loaders

   ```js
   // 模块加载
   module: {
     // loader的规则
     rules: [
       // 配置 css 文件的解析
       {
         test: /\.css$/,
         use: [ // 根据官方文档写的，注意'css-loader'的书写位置
           {
             loader: MiniCssExtractPlugin.loader,
             options: {
               publicPath:'../',
             },
           },
           'css-loader'
         ]
       },
     ],
   }
   ```

4. 插件的配置

   ```js
   // 定义打包好的文件的存放路径和文件名
   new MiniCssExtractPlugin({ 
      filename:'css/index.css'
   })
   ```

   






## webpack 中处理 less 文件

1. 下载依赖包

   注意: 解析less文件需要识别 less 语法, 所以除了 `less-loader`  需要额外下载 `less` 包  

   ```
   yarn add less  less-loader  -D
   ```

2. 配置

   ```js
   // 配置 less 文件的解析
   {
     test: /\.less$/,
     use: [
       {
         loader: MiniCssExtractPlugin.loader,
         options: {
             publicPath:'../',
         },
       }, 
       'css-loader',
       'less-loader' 
     ]
   }
   ```

   







## webpack 中处理图片 - url-loader

我们试了一下，在`css`中用到一下背景图片，结果就报错了，难道`webpack`连图片也认不出来吗？

没有错，的确认不出来, 此时需要转换图片的 loader, 来处理图片的问题,  主要用到 `url-loader`  和   `file-loader`

注意: `url-loader` 中的部分功能要用到 `file-loader`,  要下载两个模块

1. 下载依赖包

   ```
   yarn add url-loader file-loader -D
   ```

2. 配置loader

   ```js
   {
     test: /\.(png|jpg|gif)$/,
     use: [
       { loader: 'url-loader' }
     ]
   }
   ```

   图片默认转成 base64 字符串了,  

   - 好处就是浏览器不用发请求了，直接可以读取
   - 坏处就是如果图片太大，再转`base64`就会让图片的体积增大 30% 左右, 得不偿失

   所以需要通过 options 配置选项进行配置 limit, 可以设置一个临界值, 大于这个值会整个文件直接打包到目录中, 得到是路径,

   如果小于这个值, 就会转成 base64, 节约请求的次数

   ```js
   {
     test: /\.(png|jpg|gif)$/,
     use: [
       {
         loader: 'url-loader',
         options: {
           // 超过 8k 就不转 base64, 小于 8k 才转
           limit: 8 * 1024
         }
       }
     ]
   }
   ```

   

## 配置图片的打包输出目录

默认是直接输出到了 dist 根目录, 可以通过 options 进行配置

```js
{
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        // 超过 8k 就不转 base64, 小于 8k 才转
        limit: 8 * 1024,
        // 配置输出的文件名
        name: '[name].[ext]',
        // 配置静态资源的引用路径
        publicPath: "../images/",
        // 配置输出的文件目录
        outputPath: "images/"
      }
    }
  ]
}
```







## webpack 配置字体图标 - url-loader

字体图标 和 图片的配置一致

``` js
// 处理字体图标的解析
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        // 配置输出的文件名
        name: '[name].[ext]',
        // 配置静态资源的引用路径
        publicPath: "../fonts/",
        // 配置输出的文件目录
        outputPath: "fonts/"
      }
    }
  ]
}
```





## webpack 使用 babel 处理高版本的 js 语法

babel 的介绍 => 用于处理高版本 js语法 的兼容性

  1. 安装包

      ```
      yarn add -D babel-loader @babel/core @babel/preset-env
      ```

  2. 配置规则

      ```js
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
      ```

      





## webpack-dev-server自动刷新

1. 下载

```
yarn add webpack-dev-server -D
```

2. 配置scripts

```js
scripts: {
	"build": "webpack --config webpack.config.js"
	"dev": "webpack-dev-server --config webpack.config.js"
}
```






## webpack-dev-server 的配置

```js
devServer: {
  port: 3000, // 端口号
  open: true, // 自动打开浏览器
  hot: true   // 开启热更新
}
```





# ES6模块化

在之前的 javascript 中一直是没有模块系统的，前辈们为了解决这些问题，提出了各种规范, 最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。而 ES6 中提供了简单的模块系统，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。 

## 基本使用

> 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个 变量，就必须使用export关键字输出该变量。下面是一个JS文件，里面使用export命令输出变量。 

es6 中新增了两个命令 `export` 和 `import` , `export` 命令用于规定模块的对外接口，`import` 命令用于输入其他模块提供的功能 

```js
// a.js
export const name = 'pp'
export const age = 18
export const desc = '很帅'
```

使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件） 

```js
//main.js
import {name, age, desc} from './a.js'
console.log('从模块内部导出的内容:', name, age, desc)
```

## export详解

上面介绍了模块化最基础的用法，export 不止可以导出函数，还可以导出对象，数组，字符串等等

```js
//a.js
export const name = 'pp'
export const arr = [1, 2, 3]
export const obj = {
  name: 'zs',
  age: 18
}
```

 export的写法，除了像上面这样，还有另外一种。 

```js
//a.js
const name = 'pp'
const arr = [1, 2, 3]
const obj = {
  name: 'zs',
  age: 18
}

//	优点：上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。 
export {name, arr, obj}
```

`export default` 指定默认输出, import 无需知道变量名就可以直接使用 

```js
//a.js
export default function fn () {
  console.log('哈哈')
}

//main.js
//在导入时，可以随意的使用变量名来接收
import a from './a'
a()
```

**注意：export default是非常用的语法，用的很多, 以一些常用的模块为例**

```js
import $ from 'jQuery'   // 加载jQuery 库
import moment from 'moment' // 加载 moment
```

## import详解

`import` 为加载模块的命令，基础使用方式和之前一样 

```js
//main.js
import {name, arr, user} from './a'

//如果是export default导出的内容
import a from './a'
```

## 兼容性说明

上面介绍了，es6 中模块的使用方式，但是现在es6的模块化，无论在浏览器端还是 node.js 上都没有得到很好的支持，所以需要，一些转码的工具（babel）。使我们可以用es6的方式来编码，最后输出es5的代码。 