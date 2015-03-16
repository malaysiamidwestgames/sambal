'use strict';

angular.module('midwestApp')
  .factory('eventually', function (_) {
    return function(that) {
      var registry = {};

      that.fire = function(event) {
        var array;
        var type = _.isString(event) ? event : event.type;

        if (_.has(registry, type)) {
          array = registry[type];
          _.each(array, function(handler) {
            var func = handler.method;

            console.log('executing this fn: ', func);

            func.apply(that, handler.parameters || [event]);
          });
        }
        return this;
      };

      that.on = function(type, method, parameters) {


        var handler = {
          method: method,
          parameters: parameters
        };

        console.log('storign this fn: ', handler);


        if (_.has(registry, type)) {
          registry[type].push(handler);
        } else {
          registry[type] = [handler];
        }
        return this;
      };

      return that;
    };
  });
