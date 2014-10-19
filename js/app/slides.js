'use strict';

define([
  'jquery',
  'angular',
  'slideService',
  'slide'
], function($, angular) {

  return angular.module('slides', ['slideService', 'slide'])
    .controller('SlidesController', ['$scope', 'slideService', function($scope, slideService) {

      $scope.index = 0;
      $scope.total = 0;
      $scope.slides = [];

      slideService.on('newIndex', function(newIndex) {
        $scope.setIndex(newIndex);
      });

      $scope.setup = function() {
        $scope.slides = [];
        $scope.$slides = slideService.$slides;
        $scope.total = slideService.$slides.length;

        $scope.$slides.each(function() {
          $scope.slides.push({
            name: $(this).attr('name')
          });
        });
      };

      $scope.hide = function(index) {
        $scope.$slides.eq(index).removeClass('visible');
      };

      $scope.show = function(index) {
        $scope.$slides.eq(index).addClass('visible');
      };

      $scope.handleKey = function(e) {
        // console.log(e.keyCode);

        switch (e.keyCode) {
          // up
          case 38:
            $scope.prev();
            break;
          // down
          case 40:
            $scope.next();
            break;
        }
      };

      $scope.setIndex = function(index) {
        if (index < 0) {
          return;
        }

        if (index >= $scope.total) {
          return;
        }

        $scope.hide($scope.index);
        $scope.index = index;
        $scope.show($scope.index);
      };

      $scope.next = function() {
        slideService.next();
        // slideService.setIndex($scope.index + 1);
      };

      $scope.prev = function() {
        slideService.prev();
        // slideService.setIndex($scope.index - 1);
      };

    }])

    .directive('slides', function(slideService) {
      return {
        restrict: 'E',
        controller: 'SlidesController',
        scope: true,
        link: function(scope, element, attributes) {

          slideService.setup(element.find('slide'));
          scope.setup();
          slideService.setIndex(0);

          // pass transitions down to each slide if
          if (attributes.transition) {
            element.find('slide').each(function() {
              if (!$(this).attr('transition')) {
                $(this).attr('transition', attributes.transition);
              }
            });
          }

          $(document).on('keydown', scope.handleKey);

        }
      };
    });

});
