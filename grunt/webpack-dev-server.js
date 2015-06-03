'use strict';

var _ = require('lodash');
var webpack = require('webpack');

var config = require('./webpack-config');

module.exports = function (grunt, options) {
  var app = grunt.option('app') || 'Workbench';
  var common = config(_.assign({serve: true}, options));

  // Add entry point.
  _.assign(common, {
    entry: './index.js?' + app
  });

  var https = false;
  var host = '0.0.0.0';
  var port = 8080;
  var url = 'http' + (https ? 's' : '') + '://' + host + ':' + port;

  return {
    options: {
      webpack: common
    },

    start: {
      https: https,
      host: host,
      port: port,

      hot: true,
      inline: true,
      keepalive: true,

      webpack: {
        entry: [
          require.resolve('webpack-dev-server/client/') + '?' + url,
          'webpack/hot/dev-server'
        ].concat(common.entry),

        failOnError: false,

        plugins: [
          new webpack.HotModuleReplacementPlugin()
        ].concat(common.plugins)
      }
    }
  };
};
