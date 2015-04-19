'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')

  .controller('DashboardCtrl', function ($scope,$http, session) {
    $scope.status = 'invite';
    $scope.todos = [
      {
        title: 'Audition for Midwest Night',
        label: 'More info',
        target: '_self',
        link: 'promo/auditions'
      },
      {
        title: 'Survey for Malaysia Midwest Games 2015',
        label: 'I\'ll help!',
        target: '_blank',
        link: 'https://www.surveymonkey.com/s/RGN5S96'
      }];

    session.getUser().then(function(user) {
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

      if(user.sports_payment_status) {
        $scope.todos.unshift({
          title: 'Manage your sports/teams',
          label: 'Team management page',
          link: 'teams'
        });
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
        });
    };

    $scope.decline = function (id) {
      $http.patch('/api/participants/decline/' + id)
        .success(function() {
          $scope.status = 'decline';
          console.log('declined!');
        });
    };

    $http
      .get('/api/myteams')
      .success(function(data) {
        $scope.teams = data.teams;
      });
  });
