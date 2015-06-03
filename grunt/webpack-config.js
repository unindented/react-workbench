'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

module.exports = function (options) {
  return {
    output: {
      path: './dist/',
      filename: 'ReactWorkbench.js',
      library: 'ReactWorkbench',
      libraryTarget: 'umd'
    },

    debug: (options.serve || options.test),
    devtool: (options.serve || options.test ? 'eval' : null),

    externals: (!(options.serve || options.test) ? [
      {
        'react': {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        },
        'react-router': {
          root: 'ReactRouter',
          commonjs2: 'react-router',
          commonjs: 'react-router',
          amd: 'react-router'
        }
      }
    ] : []),

    resolve: {
      extensions: ['', '.js', '.jsx'],

      modulesDirectories: [
        'apps',
        'components',
        'styles',
        'utils',
        'web_modules',
        'node_modules'
      ]
    },

    resolveLoader: {
      extensions: ['', '.js'],

      modulesDirectories: [
        'web_modules',
        'node_modules'
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],

    module: {
      loaders: [
        {
          test: /\.html$/,
          exclude: /node_modules\//,
          loader: [
            'file?name=[name].[ext]'
          ].join('!')
        },
        {
          test: /\.less$/,
          exclude: /node_modules\//,
          loader: [
            'style',
            'css?module&sourceMap',
            'postcss?sourceMap',
            'less?sourceMap',
            'wrap?less'
          ].join('!')
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules\//,
          loader: (options.serve ? [
            'react-hot'
          ] : []).concat([
            'babel?stage=1'
          ]).join('!')
        }
      ],

      postLoaders: (options.coverage ? [
        {
          test:    /\.jsx?$/,
          exclude: /(node_modules|test)\//,
          loader:  'istanbul-instrumenter'
        }
      ] : [])
    },

    postcss: [
      autoprefixer
    ],

    wrap: {
      less: {
        before: '@import "~config.less";'
      }
    },

    progress: true,

    stats: {
      colors: true,
      modules: true,
      reasons: true
    }
  };
};
