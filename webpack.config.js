'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const TestPlugin = require('./test-plugin');

module.exports = {
  entry: [
    './index.js',
    './index.html'
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html/,
        use: ['test-loader', 'html-loader']
      }
    ]
  },
  resolveLoader: {
    alias: {
      'test-loader': './test-loader.js'
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new TestPlugin()
  ]
};
