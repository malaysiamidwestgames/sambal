'use strict';

/**
 * @ngdoc service
 * @name midwestApp.teamsResource
 * @description
 * # teamsResource
 * Factory in the midwestApp.
 */
angular.module('midwestApp')
  .factory('teamsResource', function (httpWrapper) {
    return {
      getTeams: httpWrapper.get('/api/teams'),
      getTeam: httpWrapper.get('/api/teams/:id'),
      createTeam: httpWrapper.post('/api/teams', {team_captain: 'me'}),
      cancelAllUnpaidTeams: httpWrapper.delete('/api/teams/user/:id', {id: 'me'})
    };
  });
