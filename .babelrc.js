const path = require('path');

module.exports = {
  presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
  plugins: [
    require.resolve('react-hot-loader/babel'),
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [path.join(__dirname, './src')],
      },
    ],
  ],
};
