const webpack = require('webpack');

module.exports = {
  entry: {
    'dist': ['./index.js', './src/inview.js', './src/measure.js', './src/utils.js'],
  },
  output: {
    path: __dirname,
    filename: '[name]/inview.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: false }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
