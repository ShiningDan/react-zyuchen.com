var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'app/web/entry.jsx'),
    // archives: path.resolve(__dirname, 'view/archives/archives.jsx'),
    vendor: ['react', 'react-router-dom', 'moment', 'axios', 'whatwg-fetch'],
  },
  output: {
    path: path.resolve(__dirname, 'www/static/js'),
    filename: '[name].js',
    publicPath: 'js/',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      filename: 'vendor.js',
      minChucks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015','react', 'stage-3']
      }
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
    },
    {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		},
    ]
  }
};