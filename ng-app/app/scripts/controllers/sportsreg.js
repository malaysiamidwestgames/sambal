'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:SportsregCtrl
 * @description
 * # SportsregCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('SportsregCtrl', function ($scope, $http, $rootScope, $location, participantsResource) {

    var joinErrorMsg = [' The captain loves you more than you know', 'Feeling honored or something right now?', 'Yeah, you, YOU have been chosen for this', 'The captain welcomes you aboard his ship. Oh, is it sinking?', 'Is this team worth your skills?' ];
    function getJoinErrorMessage() {
      return joinErrorMsg[Math.floor(Math.random() * joinErrorMsg.length)];
    }

    var joinMsg = ['You sure you\'ll get accepted bro?', 'Hmm, as choices go, this could be a bad one.', ' You\'ve sold your services to this captain', 'I\'m sure you\'ll reconsider this later', 'Joining the big boys has always been your dream, hasn\'t it? '];
    function getJoinMessage() {
      return joinMsg[Math.floor(Math.random() * joinMsg.length)];
    }

    var userTeamUni;
    $scope.payId = 0;
    $scope.amount = 0;
    $scope.individual = false;
    $scope.doubles = false;
    $scope.registered = false;
    $scope.games = [];
    $scope.teams = [];
    $scope.universities = [];
    $scope.setTeamStatus = '';
    $scope.selectedAction = {
      name: 'Choose a sport to register for'
    };


    $scope.host = $location.host();

    $http
      .get('/api/outpay')
      .success(function(data) {
        if (data.length === 1 ) {
          $scope.payId = data[0].id;
          $scope.amount = data[0].amount;
          $scope.teams = data[0].teams;
        }
        if (data.length === 0) {
          $http
            .get('/api/paybalance')
            .success(function(data) {
              if(data > 0) {
                $scope.amount = data;
              }
            });
        }
      });

    $http.get('/api/games')
      .success(function(data){
        $scope.games = data.games;
      });


    $scope.setAction = function(action) {
      $scope.selectedAction = action;
      $scope.registered = false;
      $scope.paid = false;
      $scope.full = false;
      $scope.joinReqSent = false;
      $scope.joinReqAcc = false;
      $scope.setTeamStatus = '';

      $http.get('/api/teams?tournaments_id=' + $scope.selectedAction.id)
        .success(function(data) {
          $scope.teams = data.teams;
          if ($scope.teams.length === $scope.selectedAction.max_teams) {
            $scope.full = true;
          }
          for (var i = 0; i < $scope.teams.length; i++ ) {
            if ($scope.teams[i].team_payment_status === true && $scope.teams[i].team_captain === $rootScope.currentUser.id) {
              $scope.paid = true;
            }
            if ($scope.teams[i].team_captain === $rootScope.currentUser.id) {
              $scope.registered = true;
            }
            for (var j = 0; j < $scope.teams[i].participants.length; j++) {
              if ($scope.teams[i].participants[j].user_id === $rootScope.currentUser.id && $scope.teams[i].participants[j].status === 'join_request') {
                $scope.joinReqSent = true;
              }
              if ($scope.teams[i].participants[j].user_id === $rootScope.currentUser.id && $scope.teams[i].participants[j].status === 'accepted') {
                $scope.joinReqAcc = true;
              }
            }
          }
        }
      );

      if ($scope.selectedAction.max_players_per_team  === 1) {
        $scope.individual = true;
      }
      else if ($scope.selectedAction.max_players_per_team - $scope.selectedAction.min_players_per_team === 0) {
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
        .post('/api/teams', {name: name, team_captain: $rootScope.currentUser.id, tournaments_id: $scope.selectedAction.id, game_id: $scope.selectedAction.id, payment_id: $scope.payId, university_id: $scope.teamUni })
        .success(function (data) {
          if (data.message) {
            $scope.setTeamStatus = data.message;
          } else {
            $scope.amount += $scope.selectedAction.price_per_team;
            $scope.registered = true;
          }
      })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.destroyTeams = function () {
      $http
        .delete('/api/myteams')
        .success(function() {
          $scope.amount = 0;
          $scope.registered = false;
        });
    };

    $scope.paymentInit = function (regtype) {
      $http
        .post('/api/payments', {status: 'Payment initiated', notification_params: 'nil', regtype: regtype, transaction_id: '0000', purchased_at: Date.now(), amount: $scope.amount })
        .success(function(data) {

          $scope.payId = data.id;
          $http
            .get('/api/payupdate?payment_id=' + $scope.payId)
            .success(function() {
            });
        })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.setAmount = function(amount, regType) {
      $scope.amount = amount;
      $scope.regType = regType;
    };

    $scope.joinReq = function(teamId) {
      participantsResource.joinReq({team_id: teamId})
        .then(function() {
          $scope.joinReqSent = true;
          toastr.success(getJoinMessage(), 'Your join request has been sent');
        }, function(err) {
          if (err.status === 422) {
            toastr.error(getJoinErrorMessage(), 'You\'ve already been invited to join this team');
          } else {
            toastr.error('Oops, we have a problem', 'Try again later or contact us');
          }
        });
    };

    var noTeamHandler = function(isChecked) {
      if (isChecked) {
        $scope.teamUni = 1;
      } else {
        $scope.teamUni = userTeamUni;
      }
    };

    $scope.$watch('noTeamUni', noTeamHandler);

    $rootScope.$watch('currentUser', function(newVal, oldVal) {
      if (newVal !== undefined) {
        userTeamUni = $rootScope.currentUser.university.id;
        $scope.teamUni = userTeamUni;
      }
    });

  });
