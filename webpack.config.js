const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/ui/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'static/js/'),
    publicPath: 'static/js/',
    filename: `app.${Date.now()}.js`,
  },
  watch: true,
  // devServer: {
  //   contentBase: path.join(__dirname, 'public/assets'),
  //   port: 3030,
  //   publicPath: 'http://localhost:3030/public/assets/',
  // },
  plugins: [],
};
