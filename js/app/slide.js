'use strict';

define([
  'jquery',
  'angular',
  'slideService'
], function($, angular) {

  return angular.module('slide', ['slideService'])
    .controller('SlideController', ['$scope', 'slideService', function($scope, slideService) {


    }])

    .directive('slide', function(slideService) {
      return {
        restrict: 'E',
        controller: 'SlideController',
        link: function(scope, element, attributes) {

          function _setSub(id) {
            var subDef = $('[sub-def="' + id + '"]');
            if (subDef) {
              scope.sub = eval(subDef.html());
              slideService.registerSub(element.index(), scope.sub);
            }
          }

          function _executeSub(index) {
            if (scope.sub && scope.sub[index]) {
              scope.subIndex = index;
              scope.sub[index]();
            }
          }

          // load content
          if (attributes.src) {
            element.load(attributes.src, function() {
              // find and set the sub
              var sub = element.find('> *').eq(0).attr('sub');
              if (sub) {
                _setSub(sub);
              }
            });
          }

          if (attributes.sub) {
            _setSub(attributes.sub);
          }

          // transition in
          if (attributes.transitionIn) {

          }

          // transition in
          if (attributes.transitionOut) {

          }

        }
      };
    });

});
