const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const clientDir = path.resolve(__dirname, '../src/client');
const buildDir = path.resolve(__dirname, '../src/public/build');

module.exports = {
  target: 'web',
  entry: {
    main: `${clientDir}/index.tsx`,
    admin: `${clientDir}/admin.tsx`,
    login: `${clientDir}/login.tsx`,
  },

  output: {
    path: buildDir,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/assets/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsConfigPathsPlugin(),
    ],
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
    splitChunks: {
      chunks: 'all',
      name: false,
    }
  },

  plugins: [
    new ManifestPlugin()
  ]
};
