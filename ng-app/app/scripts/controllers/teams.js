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
    $scope.team = {
      name: 'Choose a team'
    };

    $http
      .get('/api/users')
      .success(function(data) {
        $scope.users = data.users;
      });

    $http
      .get('/api/participants/get')
      .success(function(results) {
        $scope.$watch('teams', function() {
          var count = 0;
          results.participants.forEach(function(participant){
            console.log(count++);
            $http.get('/api/teams/' + participant.team_id)
              .success(function(data){
                if (data.team.team_payment_status == true) {
                  $scope.teams.push(data.team);
                }
              });
          });
        });
      });

    $scope.setTeam = function(action) {
      $scope.team = action;
      $scope.captain = false;
      $scope.participants = action.participants;
      $scope.messages = action.messages;
      if ($scope.team.team_captain === $rootScope.currentUser.id) {
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
            $scope.participants.push(data);
            toastr.success(getInviteMessage(),  $scope.label + ' is invited to join your team');
          })
          .error(function(){
            toastr.error(getInviteMessage(),  $scope.label + ' has already sent a join request/been invited to enter your team.');
          });

      };

      $scope.acceptReq = function(userId, userName) {
        $http
          .patch('/api/participants/accept/' + userId)
          .success(function(data) {
            console.log(data);
            toastr.success(getAcceptMessage(),  userName + ' has been accepted to join your team');
          });
      };

      $scope.declineReq = function(userId, userName) {
        $http
          .patch('/api/participants/decline/' + userId)
          .success(function(data) {
            console.log(data);
            toastr.success(getDeclineMessage(),  userName + 's request to join your team has been declined');
          });
      };

      $scope.postMsg = function(message) {
        $http
          .post('/api/messages', {team_id: $scope.team.id, user_id: $rootScope.currentUser.id, message: message})
          .success(function(data) {
            console.log(data);
            $scope.message = '';
            $scope.messages.unshift(data);
          });
      };
    };
  });
