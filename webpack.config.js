const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

console.log('isProduction', isProduction);
console.log('isDevelopment', isDevelopment);

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: {
    main: `${__dirname}/src/index.js`,
  },

  externals: {
    gon: 'gon',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
    filename: '[name].js',
  },

  watch: false,

  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: isDevelopment ? 'source-map' : false,

  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              sourceMap: isDevelopment,
              hmr: isDevelopment,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              sourceMap: isDevelopment,
              hmr: isDevelopment,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
          { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
        ],
      },
    ],
  },
};
