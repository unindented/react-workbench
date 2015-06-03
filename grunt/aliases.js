'use strict';

module.exports = {
  'buildw': ['webpack:watch'],
  'build':  ['webpack:build'],
  'optim':  ['webpack:optim'],
  'serve':  ['webpack-dev-server:start'],

  'testw': ['karma:watch'],
  'test':  ['karma:test'],

  'default': ['test']
};
