'use strict';

/**
 * @ngdoc service
 * @name midwestApp.user
 * @description
 * # user
 * Factory in the midwestApp.
 */
angular.module('midwestApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id');
  });
