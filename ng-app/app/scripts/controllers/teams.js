'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:TeamsCtrl
 * @description
 * # TeamsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('TeamsCtrl', function ($scope, $http, $rootScope,
    participantsResource, usersResource, toastr, _, teamsResource) {

    var inviteMsg = ['You\'ve made good choices all your life, why stop now?', 'You do want to win, do you?', 'You are one risk-loving captain, that\'s for sure.', 'There are better candidates out there though', 'You\'re just throwing your team fee away, are you?'];
    function getInviteMessage() {
      return inviteMsg[Math.floor(Math.random() * inviteMsg.length)];
    }

    var acceptMsg = ['Wow, your sense of judgment must be wayyyy off', 'It\'s good to be noble, but there\'s a reason why noblemen are vanishing in this age', 'Well, if you must...', 'Hmm, how did you become captain again?', 'Err on the side of caution, not on the side of losing'];
    function getAcceptMessage() {
      return acceptMsg[Math.floor(Math.random() * inviteMsg.length)];
    }

    var declineMsg = ['It had to be done....', 'Can\'t say I blame you', 'Be proud of yourself. Tomorrow, you\'ll win', 'Remember this moment you saved the team, captain', 'You came, you saw the truth, you kicked him out' ];
    function getDeclineMessage() {
      return declineMsg[Math.floor(Math.random() * inviteMsg.length)];
    }


    $scope.teams = [];

    usersResource.getUserTeams().then(function(teams) {
      $scope.teams = teams.teams;
    });


    $scope.setTeam = function(team) {
      $scope.team = team;
    };


    $scope.inviteReq = function() {
      participantsResource.invite({team_id: $scope.team.id, email: $scope.inviteEmail})
        .then(function(data) {
          $scope.team.participants.push(data);
          toastr.success(getInviteMessage(),  data.user.first_name + ' ' + data.user.last_name + '  is invited to join your team');
        }, function(errResponse) {
          if (errResponse.status === 404) {
            toastr.error('Oops, email:' + $scope.inviteEmail + ' is not found');
          } else if (errResponse.status === 422) {
            toastr.error(getInviteMessage(),  $scope.inviteEmail + ' has already sent a join request/been invited to enter your team.');
          } else {
            toastr.error('Oops, we seem to have some troubles. Try again later or email us');
          }
        });
    };

    $scope.acceptReq = function(participant) {
      participantsResource.acceptReq({id: participant.id})
        .then(function() {
          participant.status = 'accepted';
          toastr.success(getAcceptMessage(),  participant.user.first_name + ' has been accepted to join your team');
        });
    };

    $scope.declineReq = function(participant) {
      participantsResource.declineReq({id: participant.id})
        .then(function() {
          participant.status = 'declined';
          toastr.success(getDeclineMessage(),  participant.user.first_name + 's request to join your team has been declined');
        });
    };

    $scope.postMsg = function(message) {
      $http
        .post('/api/messages', {team_id: $scope.team.id, user_id: $rootScope.currentUser.id, message: message})
        .success(function(data) {
          $scope.message = '';
          $scope.messages.unshift(data);
        });
    };

    $scope.declineInvite = function() {
      participantsResource.declineReq({id: $scope.team.participant_id})
        .then(function() {
          $scope.teams = $scope.teams.filter(function(team) {
            return team.id !== $scope.team.id;
          });
          $scope.team = null;
        });
    };

    $scope.acceptInvite = function() {
      participantsResource.acceptReq({id: $scope.team.participant_id})
        .then(function() {
          teamsResource.getTeam({id: $scope.team.id}).then(function(team) {
            $scope.team = team.team;
            var idx = _.findIndex($scope.teams, function(team) {
              return team.id === $scope.team.id;
            });
            $scope.teams[idx] = team.team;
          });
        });
    };
  });
