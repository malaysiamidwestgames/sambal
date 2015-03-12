'use strict';

/**
 * @ngdoc service
 * @name midwestApp.universityResource
 * @description
 * # universityResource
 * Factory in the midwestApp.
 */
angular.module('midwestApp')
  .factory('universityResource', function (httpWrapper) {
    return httpWrapper.get('/api/universities');
  });
