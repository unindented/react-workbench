'use strict';

require('es5-shim');

var matchers = require('jasmine-jquery-matchers');
beforeEach(function () {
  jasmine.addMatchers(matchers);
});

var appsContext = require.context('./apps', true, /\/test\/.*\.jsx?$/);
appsContext.keys().forEach(appsContext);
