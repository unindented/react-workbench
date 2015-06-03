'use strict';

var _ = require('lodash');
var webpack = require('webpack');

var config = require('./webpack-config');

module.exports = function (grunt, options) {
  var app = grunt.option('app') || 'Workbench';
  var common = config(options);

  // Add entry point.
  _.assign(common, {
    entry: './index.js?' + app
  });

  return {
    options: common,

    // Watch for changes and do an unoptimized build.
    watch: {
      failOnError: false,

      watch: true,
      keepalive: true
    },

    // Unoptimized build.
    build: {
      failOnError: true
    },

    // Optimized build.
    optim: {
      failOnError: true,

      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),

        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
      ]
    }
  };
};
