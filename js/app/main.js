'use strict';

require.config({
  paths: {
    'jquery':    '../lib/jquery/jquery.min',
    'angular':   '../lib/angular/angular.min'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'angular': {
      exports: 'angular'
    }
  }
})

define([
  'jquery',
  'angular',
  'slides',
  'slide',
  'menu'
], function($, angular) {

  angular.bootstrap(document, ['slides', 'slide', 'menu']);

});
