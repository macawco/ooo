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
        $scope.$slides.eq(index).hide();
      };

      $scope.show = function(index) {
        $scope.$slides.eq(index).show();
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
        $scope.setIndex($scope.index + 1);
      };

      $scope.prev = function() {
        $scope.setIndex($scope.index - 1);
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
          scope.setIndex(0);
          $(document).on('keydown', scope.handleKey);

        }
      };
    });

});
