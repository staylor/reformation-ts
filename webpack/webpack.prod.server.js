const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.server');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
});
