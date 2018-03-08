const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const clientDir = path.resolve(__dirname, '../src/client');
const buildDir = path.resolve(__dirname, '../build/client');

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',

  externals: nodeExternals(),

  entry: {
    main: `${clientDir}/index.tsx`,
  },

  output: {
    path: buildDir,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/assets/',
    libraryTarget: 'var',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      }, {
        test: /.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      }
    ]
  },

  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'vendor',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    }
  },
};
