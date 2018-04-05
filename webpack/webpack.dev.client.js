const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.client');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: false,
});
