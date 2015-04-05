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
    $scope.registered = false;
    $scope.unpaid = false;
    $scope.games = [];
    $scope.teams = [];
    $scope.selectedAction = {
      name: 'Choose a sport to register for'
    };

    $http
      .get('/api/outpay')
      .success(function(data) {
        console.log(data);
        if (data.length == 1 ) {
          $scope.payId = data[0].id;
          $scope.amount = data[0].amount;
          $scope.unpaid = true;
        }
        if (data.length == 0) {
          $http
            .get('/api/paybalance')
            .success(function(data) {
              if(data > 0) {
                $scope.amount = data
              }
            });
        }
      });



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
      $scope.registered = false;
      $http.get('/api/teams?tournaments_id=' + $scope.selectedAction.id)
        .success(function(data) {
          console.log(data);
          $scope.teams = data.teams;
          $scope.spotsLeft = $scope.selectedAction.max_teams - $scope.teams.length;
          for (var i = 0; i < $scope.teams.length; i++ ) {
            if ($scope.teams[i].team_captain == $rootScope.currentUser.id) {
              $scope.registered = true;
            }
          }
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
        .post('/api/teams', {name: name, team_captain: $rootScope.currentUser.id, tournaments_id: $scope.selectedAction.id, game_id: $scope.selectedAction.id, payment_id: $scope.payId })
        .success(function (data) {
          console.log(data);
          $http
            .post('api/participants', {team_id: data.id, user_id:$rootScope.currentUser.id})
            .success(function(data) {
              console.log(data);
            })
          $scope.amount += $scope.selectedAction.price_per_team;
      })
        .error(function(error) {
          console.log(error);
        });
    };


    ;

    $scope.paymentInit = function (regtype) {
      $http
        .post('/api/payments', {status: 'Payment initiated', notification_params: 'nil', regtype: regtype, transaction_id: '0000', purchased_at: Date.now(), amount: $scope.amount })
        .success(function(data) {
          console.log(data);
          $scope.payId = data.id;
          $http
            .get('/api/payupdate?payment_id=' + $scope.payId)
            .success(function(data) {
              console.log(data);
            })
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
