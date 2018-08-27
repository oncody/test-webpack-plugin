'use strict';

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
    new TestPlugin()
  ]
};
