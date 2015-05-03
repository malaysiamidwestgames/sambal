'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')

  .controller('DashboardCtrl', function ($scope, $http, $modal, $window, $location, session) {

    $scope.host = $location.host();

    $scope.payId = 0;
    $scope.amount = 0;
    $scope.status = 'invite';
    $scope.isVolunteer = false;

    var acceptMsg = ['Wow, your sense of judgment must be wayyyy off', 'It\'s good to be noble, but there\'s a reason why noblemen are vanishing in this age', 'Well, if you must...', 'Hmm, how did you become captain again?', 'Err on the side of caution, not on the side of losing'];
    function getAcceptMessage() {
      return acceptMsg[Math.floor(Math.random() * acceptMsg.length)];
    }

    var declineMsg = ['It had to be done....', 'Can\'t say I blame you', 'Be proud of yourself. Tomorrow, you\'ll win', 'Remember this moment you saved the team, captain', 'You came, you saw the truth, you kicked him out' ];
    function getDeclineMessage() {
      return declineMsg[Math.floor(Math.random() * declineMsg.length)];
    }
    $scope.todos = [
      /* Audition deadline is over!
      {
        title: 'Audition for Midwest Night',
        label: 'More info',
        target: '_self',
        link: 'promo/auditions'
      },*/
      {
        title: 'Manage your sports/teams',
        label: 'Team management page',
        link: 'teams'
      },
      {
        title: 'Survey for Malaysia Midwest Games 2015',
        label: 'I\'ll help!',
        target: '_blank',
        link: 'https://www.surveymonkey.com/s/RGN5S96'
      }];

    session.getUser().then(function(user) {
      console.log(user);
      if (!user.registration_payment_status) {
        $scope.todos.unshift({
          title: 'Pay for registration',
          label: 'Pay now',
          link: 'payment'
        });
      }

      if (user.registration_payment_status) {
        $scope.todos.unshift({
          title: 'Register for sports',
          label: 'Register now',
          link: 'sportsreg'
        });
      }

      if (user.volunteer_status) {
        $scope.isVolunteer = true;
        console.log($scope.isVolunteer);
      }


    $http.get('/api/participants/get_invite')
      .success(function(result){
        $scope.participating = result.participants;
        $scope.$watch('participating', function() {
          $scope.participating.forEach(function(participate){
            $http.get('/api/teams/' + participate.team_id)
              .success(function(data){
                participate.name = data.team.name;
                participate.gamename = data.team.game.name;
                participate.gamecategory = data.team.game.category;
              });
          });
        });
      });
    });

    $scope.accept = function (id) {
      $http.patch('/api/participants/accept/' + id)
        .success(function() {
          $scope.status = 'accept';
          toastr.success(getAcceptMessage(), 'You\'ve accepted the invitation of this team\'s captain');
        });
    };

    $scope.decline = function (id) {
      $http.patch('/api/participants/decline/' + id)
        .success(function() {
          $scope.status = 'decline';
          toastr.error(getDeclineMessage(), 'You\'ve declined the invitation from this team\'s captain');
          console.log('declined!');
        });
    };

    $http
      .get('/api/participants/get')
      .success(function(data) {
        $scope.teams = data.participants;
        $scope.$watch('teams', function() {
          var count = 0;
          $scope.teams.forEach(function(team){
            $http.get('/api/teams/' + team.team_id)
              .success(function(data){
                team.name = data.team.name;
                team.gamename = data.team.game.name;
                team.gamecategory = data.team.game.category;
                team.index = count;
                count++;
              });
          });
          //console.log($scope.teams.length);
        });
      });

    $scope.open_volunteer = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'views/m_volunteer.html',
        controller: 'VolunteerCtrl',
        size: size,
        resolve: {
          isVolunteer: function () {
            return $scope.isVolunteer;
          }
        }

      });

      modalInstance.result.then(function(result) {
        $scope.isVolunteer = true;
      });

    };

    $scope.open_shirt = function (size) {
      $modal.open({
        templateUrl: 'views/m_shirt.html',
        controller: 'ShirtCtrl',
        size: size,
        resolve: {
          payId: function () {
            return $scope.payId;
          },
          amount: function () {
            return $scope.amount;
          }
        }
      });

    };
  });
