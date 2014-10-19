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
      service.subs = {};
      service.subIndex = 0;

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

      service.registerSub = function(index, sub) {
        service.subs[index] = sub;
      };

      service.setIndex = function(index) {
        if (index < 0) {
          return;
        }

        if (index >= service.total) {
          return;
        }

        if (service.subs[index]) {
          service.subIndex = 0;
          service.subs[index][0]();
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
        if (service.nextSub()) {
          return;
        }

        service.setIndex(service.index + 1);
      };

      service.nextSub = function() {
        var sub = service.subs[service.index];

        if (sub) {
          if (service.subIndex < sub.length - 1) {
            service.subIndex++;
            sub[service.subIndex]();
            return true;
          }
        } else {
          return false;
        }
      };

      service.prev = function() {
        if (service.prevSub()) {
          return;
        }

        service.setIndex(service.index - 1);
      };

      service.prevSub = function() {
        var sub = service.subs[service.index];

        if (sub) {
          if (service.subIndex > 0) {
            service.subIndex--;
            sub[service.subIndex]();
            return true;
          }
        } else {
          return false;
        }
      };

      return service;
    });

});
