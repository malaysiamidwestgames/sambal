'use strict';

/**
 * @ngdoc service
 * @name midwestApp.usersResource
 * @description
 * # usersResource
 * Factory in the midwestApp.
 */
angular.module('midwestApp')
  .factory('usersResource', function (httpWrapper) {
    return {
      getUser: httpWrapper.get('/api/users/:id', {id: 'me'}),
      getUsers: httpWrapper.get('/api/users'),
      getUserTeams: httpWrapper.get('/api/users/:id/teams', {id: 'me'}),
      getUserPayments: httpWrapper.get('/api/users/:id/payments', {id: 'me'})
    };
  });
