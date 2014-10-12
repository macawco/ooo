'use strict';

define([
  'jquery',
  'angular',
  'slideService'
], function($, angular) {

  return angular.module('menu', ['slideService'])
    .controller('MenuController', function($scope, $element, slideService) {

      $scope.slides = slideService.slides;

      $scope.toggle = function() {
        $element.toggleClass('visible');
      };

      $scope.show = function() {
        $element.addClass('visible');
      };

      $scope.hide = function() {
        $element.removeClass('visible');
      };

      $scope.handleKey = function(e) {
        switch (e.keyCode) {
          // m
          case 77:
            $scope.toggle();
            break;
        }
      };

      $scope.showSlide = function(index) {
        $scope.hide();
        slideService.setIndex(index);
      };

    })

    .directive('menu', function() {
      return {
        restrict: 'E',
        controller: 'MenuController',
        templateUrl: 'js/templates/menu.html',
        scope: true,
        link: function(scope, element, attributes) {

          $(document).on('keydown', scope.handleKey);

        }
      };
    });

});
