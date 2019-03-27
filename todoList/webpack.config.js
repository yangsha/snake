const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => ({
  context: __dirname,
  target: 'web',
  entry: path.resolve(__dirname, 'src/index.js'),

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-object-rest-spread',
          ],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    port: 8080,
    hot: true,
  },
})
