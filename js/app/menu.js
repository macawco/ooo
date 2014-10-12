'use strict';

define([
  'jquery',
  'angular',
  'slideService'
], function($, angular) {

  return angular.module('menu', ['slideService'])
    .controller('MenuController', function($scope, $element, slideService) {

      $scope.slides = slideService.slides;

      slideService.on('newIndex', function(newIndex) {
        $scope.setIndex(newIndex);
      });

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

      $scope.setIndex = function(index) {
        $element.find('.current').removeClass('current');
        $element.find('li').eq(index).addClass('current');
      };

      // @todo: replace timeout with a legit event
      setTimeout(function() {
        $scope.setIndex(slideService.index);
      }, 100);

    })

    .directive('menu', function(slideService) {
      return {
        restrict: 'E',
        controller: 'MenuController',
        templateUrl: 'js/templates/menu.html',
        scope: true,
        link: function(scope, element, attributes) {
          scope.setIndex(slideService.index);
          $(document).on('keydown', scope.handleKey);
        }
      };
    });

});
