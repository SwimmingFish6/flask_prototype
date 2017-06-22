/**
 * Created by luxuhui on 2017/5/8.
 */
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'], //设定babel的转码规则
          "plugins": [
            ["import", { libraryName: "antd", "style": "css" }] // `style: true` 会加载 less 文件
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
