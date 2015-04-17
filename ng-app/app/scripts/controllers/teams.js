'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:TeamsCtrl
 * @description
 * # TeamsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('TeamsCtrl', function ($scope, $http) {

    $scope.team = {
      name: 'Choose a team'
    };

    $http
      .get('/api/myteams')
      .success(function(data) {
        console.log(data);
        $scope.teams = data.teams;
      })

    $scope.setTeam = function(action) {
      $scope.team = action;
      $http
        .get('/api/teams/' + $scope.team.id)
        .success(function(data) {
          console.log(data);
        })
    };
  });
