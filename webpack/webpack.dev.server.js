const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.server');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: false,
});
