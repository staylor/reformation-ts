const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverDir = path.resolve(__dirname, '../src/server');
const buildDir = path.resolve(__dirname, '../build/server');

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'source-map',

  node: {
    __dirname: false,
    __filename: false,
  },

  externals: nodeExternals(),

  entry: {
    main: `${serverDir}/index.tsx`,
  },

  output: {
    path: buildDir,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/assets/',
    libraryTarget: 'commonjs2',
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
  },
};
