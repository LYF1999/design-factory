/* eslint-disable */

module.exports = function (webpackConfig, env) {
  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif|ttf)$/i,
    loader: 'file',
    query: {
      name: 'static/[name].[ext]'
    }
  });
  return webpackConfig;
};

/* eslint-disable */
