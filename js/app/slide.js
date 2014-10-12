'use strict';

define([
  'jquery',
  'angular'
], function($, angular) {

  return angular.module('slide', [])
    .controller('SlideController', ['$scope', function($scope) {


    }])

    .directive('slide', function() {
      return {
        restrict: 'E',
        controller: 'SlideController',
        link: function(scope, element, attributes) {

          // load content
          if (attributes.src) {
            element.load(attributes.src);
          }

        }
      };
    });

});
