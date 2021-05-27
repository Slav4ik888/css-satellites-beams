const path = require(`path`);


module.exports = {
  entry: `./src/index.js`,
  output: {
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`),
    open: false,
    port: 5500,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  resolve: {
    modules: [`node_modules`, `src`],
    extensions: [`.jsx`, `.js`, `.json`, `.css`]
  },
  devtool: `source-map`,
};
