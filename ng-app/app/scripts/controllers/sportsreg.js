'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:SportsregCtrl
 * @description
 * # SportsregCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('SportsregCtrl', function ($scope, $http, $rootScope) {

    $scope.payId = 0;
    $scope.amount = 0;
    $scope.individual = false;
    $scope.doubles = false;
    $scope.games = [];
    $scope.teams = [];
    $scope.selectedAction = {
      name: 'Choose a sport to register for'
    };

    /*$scope.todos = [
      {
        title: 'Register for sports',
        label: 'Register now',
        link: 'sportsreg'
      },
      {
        title: 'Audition for Midwest Night',
        label: 'More info',
        link: 'promo/auditions'
      }];
*/
    $http.get('/api/allgames')
      .success(function(data){
        $scope.games = data.allgames;
      });


    $scope.setAction = function(action) {
      $scope.selectedAction = action;
      $http.get('/api/teams?tournaments_id=' + $scope.selectedAction.id)
        .success(function(data) {
          console.log(data);
          $scope.teams = data.teams;
        }
      )
      if ($scope.selectedAction.max_players_per_team  == 1) {
        $scope.individual = true;
      }
      else if ($scope.selectedAction.max_players_per_team - $scope.selectedAction.min_players_per_team == 0) {
        $scope.individual = false;
        $scope.doubles = true;
      }
      else {
        $scope.individual = false;
        $scope.doubles = false;
      }
    };

    $scope.setTeam = function(name) {
      $http
        .post('/api/teams', {name: name, team_captain: $rootScope.currentUser.id, tournaments_id: $scope.selectedAction.id, game_id: $scope.selectedAction.id })
        .success(function (data) {
          console.log(data);
          $scope.amount += $scope.selectedAction.price_per_team;
      })
        .error(function(error) {
          console.log(error);
        });
    };


    ;

    $scope.paymentInit = function (regtype) {
      $http
        .post('/api/payments', {status: 'Processing payment', notification_params: 'nil', regtype: regtype, transaction_id: '0000', purchased_at: Date.now() })
        .success(function(data) {
          $scope.payId = data.id;
        })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.setAmount = function(amount, regType) {
      $scope.amount = amount;
      $scope.regType = regType;
    };

  });
