const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const serverDir = path.resolve(__dirname, '../src/server');
const buildDir = path.resolve(__dirname, '../build');

module.exports = {
  target: 'node',
  entry: {
    main: `${serverDir}/index.ts`,
  },

  externals: nodeExternals(),

  output: {
    path: buildDir,
    filename: '[name].js',
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
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader?useCache=true&slient=true',
        exclude: /node_modules/,
      }
    ]
  },
};
