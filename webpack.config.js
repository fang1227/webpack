const path = require('path')
// 引入分离 css 文件的 模块
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 定义打包好的文件的存放路径和文件名 
module.exports = {
    // entry: 配置入口文件 (从哪个文件开始打包)
    entry: './src/main.js',
    // output: 配置输出 (打包到哪去)    
    output: {
        // 打包输出的目录 (必须是绝对路径)
        path: path.join(__dirname, 'dist'),
        // 打包生成的文件名
        filename: 'main.js'
    },
    // 打包模式 production 压缩/development 不压缩
    mode: 'production',
    // 加载模块
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
                            publicPath: '../',
                        },
                    },
                    'css-loader'
                ]
            },
            // babel配置
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // 处理图片的解析
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
                            publicPath: "./src/image",
                            // 配置输出的文件目录
                            outputPath: "img"
                        }
                    }
                ]
            },
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
        ]
    },

    // 进行插件的实例化
    plugins: [
        // 定义打包好的文件的存放路径和文件名
        new MiniCssExtractPlugin({
            filename: 'css/home.css'
        })
    ],
    devServer: {
        port: 3000, // 端口号 
        hot: true   // 开启热更新
    }
}

