const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

module.exports = {
  mode: env,
  entry: {
    core: 'core-js/stable',
    regenerator: 'regenerator-runtime/runtime',
    bundle: path.join(__dirname, './src/index.js'),
  },
  output: {
    path: path.join(__dirname, './docs'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './src'),
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, './node_modules'),
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, './src'),
        use: [
          isDev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.join(__dirname, './src'),
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.ttf$/,
        include: path.join(__dirname, './fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.gql$/,
        include: path.join(__dirname, './src'),
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      cache: true,
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, './docs'),
    hot: true,
    historyApiFallback: true,
    proxy: { '/graphql': { target: 'http://localhost:3000' } },
  },
};
