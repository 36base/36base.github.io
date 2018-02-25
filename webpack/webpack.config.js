const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

const projDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    app: path.resolve(projDir, 'src/index.jsx'),
  },

  resolve: {
    modules: [path.resolve(projDir, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: projDir,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new UglifyPlugin(),
  ],
};
