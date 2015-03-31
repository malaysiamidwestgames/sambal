'use strict';

/**
 * @ngdoc service
 * @name midwestApp.sportsResource
 * @description
 * # universityResource
 * Factory in the midwestApp.
 */
angular.module('midwestApp')
  .factory('gamesResource', function (httpWrapper) {
    return httpWrapper.get('/api/allgames');
  });
