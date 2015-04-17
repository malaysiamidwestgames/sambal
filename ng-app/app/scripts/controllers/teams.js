'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:TeamsCtrl
 * @description
 * # TeamsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('TeamsCtrl', function ($scope, $http, $rootScope) {

    $scope.team = {
      name: 'Choose a team'
    };

    $http
      .get('/api/users')
      .success(function(data) {
        $scope.users = data.users;
      })


    $http
      .get('/api/myteams')
      .success(function(data) {
        console.log(data);
        $scope.teams = data.teams;
      })

    $scope.setTeam = function(action) {
      $scope.team = action;
      $scope.captain = false;
      $scope.participants = [];
      $scope.participants = action.participants;
      if ($scope.team.team_captain == $rootScope.currentUser.id) {
        $scope.captain = true;
      }

      $scope.onSelect = function($item, $model, $label) {
        $scope.label = $label;
        $scope.item = $item;
        $scope.model = $model;
      };

      $scope.inviteReq = function(user) {
        console.log(user);
        $http
          .post('/api/participants/invite', {team_id: $scope.team.id, user_id: user})
          .success(function(data) {
            console.log(data);
        })
        toastr.success('You sure bout this bro?',  $scope.label + ' is invited to join your team')
      }
    };
  });
