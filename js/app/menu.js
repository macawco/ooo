'use strict';

define([
  'jquery',
  'angular',
  'slideService'
], function($, angular) {

  return angular.module('menu', ['slideService'])
    .controller('MenuController', function($scope, $element, slideService) {

      $scope.slides = slideService.slides;
      $scope.index = 0;

      slideService.on('newIndex', function(newIndex) {
        $scope.index = newIndex;
      });

      $scope.toggle = function() {
        if ($element.hasClass('visible')) {
          $scope.hide();
        } else {
          $scope.show();
        }
      };

      $scope.show = function() {
        $element.addClass('visible');

        setTimeout(function() {
          $scope.query = '';
          $element.find('.menu-search').focus();
        }, 10);
      };

      $scope.hide = function() {
        $scope.query = '';
        $element.find('.menu-search').blur();
        $element.removeClass('visible');
      };

      $scope.handleKey = function(e) {
        // console.log(e.keyCode);

        switch (e.keyCode) {
          // m
          case 77:
            if (!$scope.focus) {
              $scope.toggle();
            }
            break;
          // esc
          case 27:
            $scope.hide();
            break;
        }
      };

      $scope.showSlide = function(index) {
        $scope.hide();
        slideService.setIndex(index);
      };

      $scope.setFocus = function(focus) {
        $scope.focus = focus;
      };

    })

    .filter('searchFilter', function ($filter) {
      return function (input, search) {
        if (angular.isUndefined(input)) {
          return;
        }

        angular.forEach(input, function(found) {
          found.dimmed = true;
        });

        angular.forEach($filter('filter')(input, search, false), function(found) {
          found.dimmed = false;
        });

        return input;
      };
    })

    .directive('menu', function(slideService) {
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
