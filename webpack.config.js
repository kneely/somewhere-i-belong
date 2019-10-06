// Imports
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const options = require('./babel.config')

// Settings
const title = 'Somewhere I Belong'
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const modeFolder = mode === 'production' ? 'prd' : 'dev'
const styleLoader = mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
const libFolder = path.join(__dirname, 'lib')
const distFolder = path.join(__dirname, 'dist', modeFolder)

module.exports = {
  mode,
  entry: [
    'core-js/stable',
    path.join(libFolder, 'app.jsx'),
  ],
  output: {
    path: distFolder,
    filename: 'js/[name].bundle.[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options,
        },
      },
      {
        test: /\.css$/,
        use: [
          styleLoader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'img/',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title,
      filename: path.join(distFolder, 'index.html'),
      inject: 'body',
      template: path.join(libFolder, 'templates', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  devServer: {
    historyApiFallback: true,
  },
}
