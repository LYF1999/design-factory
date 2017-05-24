/* eslint-disable */

module.exports = function (webpackConfig, env) {
  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif)$/i,
    loader: 'file?name=[name].[ext]',
  });
  return webpackConfig;
};

/* eslint-disable */
