'use strict';

define([
  'jquery',
  'angular'
], function($, angular) {

  return angular.module('slideService', [])

    .service('slideService', function ($rootScope) {
      var service = {};

      service.index = 0;
      service.total = 0;
      service.slides = [];
      service.handlers = {};

      service.setup = function($slides) {
        service.slides = [];
        service.$slides = $slides;
        service.total = $slides.length;

        service.$slides.each(function() {
          service.slides.push({
            name: $(this).attr('name')
          });
        });
      };

      service.setIndex = function(index) {
        if (index < 0) {
          return;
        }

        if (index >= service.total) {
          return;
        }

        service.index = index;
        service.dispatch('newIndex', index);
      };

      service.on = function(name, callback) {
        if (!service.handlers[name]) {
          service.handlers[name] = [];
        }

        service.handlers[name].push(callback);
      };

      service.dispatch = function(name, data) {
        for (var i = 0; i < service.handlers[name].length; i++) {
          service.handlers[name][i](data);
        }
      };

      service.next = function() {
        service.setIndex(service.index + 1);
      };

      service.prev = function() {
        service.setIndex(service.index - 1);
      };

      return service;
    });

});
