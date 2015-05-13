'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:SportsregCtrl
 * @description
 * # SportsregCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('SportsregCtrl', function ($scope, $http, $rootScope, $location, participantsResource, teamsResource, toastr, _) {

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
      console.log(action);
      $scope.selectedAction = action;
      $scope.registered = false;
      $scope.paid = false;
      $scope.full = false;
      $scope.joinReqSent = false;
      $scope.joinReqAcc = false;
      $scope.setTeamStatus = '';

      teamsResource.getTeams({tournaments_id: $scope.selectedAction.id})
        .then(function(data) {
          $scope.teams = data.teams;
          if ($scope.teams.length === $scope.selectedAction.max_teams) {
            $scope.full = true;
          }
          _.each($scope.teams, function(team) {
            if (team.is_captain && team.team_payment_status) {
              $scope.paid = true;
            }
            if (team.is_captain) {
              $scope.registered = true;
            }
            if (team.request_pending) {
              $scope.joinReqSent = true;
            }
            if (team.is_member) {
              $scope.joinReqAcc = true;
            }
          });
        });

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
      teamsResource.createTeam({name: name, tournaments_id: $scope.selectedAction.id, game_id: $scope.selectedAction.id, payment_id: $scope.payId, university_id: $scope.teamUni})
        .then (function (data) {
          if (data.message) {
            $scope.setTeamStatus = data.message;
          } else {
            $scope.amount += $scope.selectedAction.price_per_team;
            $scope.registered = true;
          }
      }, function() {
        toastr.error('Oops, we have a problem', 'Try again later or contact us');
      });
    };

    $scope.destroyTeams = function () {
      teamsResource.cancelAllUnpaidTeams()
        .then(function() {
          $scope.amount = 0;
          $scope.registered = false;
        });
    };

    $scope.paymentInit = function (regtype) {
      //TODO: Search whether there are existing payment initiated first!
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

    $rootScope.$watch('currentUser', function(newVal) {
      if (newVal !== undefined) {
        userTeamUni = $rootScope.currentUser.university.id;
        $scope.teamUni = userTeamUni;
      }
    });

  });
