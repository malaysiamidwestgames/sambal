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
    $scope.todos = [
    {
      title: 'Audition for Midwest Night',
      label: 'More info',
      link: 'promo/auditions'
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

      //TODO: Call API to read all games that the player is playing and display it on sports tab
     $http.get('api/participants/get')
        .success(function(result){
          console.log(result);
          $scope.participating = result.participants;
          console.log($scope.participating);

          $scope.$watch('participating', function() {
            $scope.participating.forEach(function(participate){
              console.log(participate);
              $http.get('/api/teams/' + participate.team_id)
                .success(function(data){
                  participate.name = data.team.name;
                });
            });
          });
        });
    });

    $scope.accept = function (id) {
      $http.patch('api/participants/accept/' + id)
        .success(function() {
          console.log('accepted!');
        });
    };

    $scope.decline = function (id) {
      $http.patch('api/participants/decline/' + id)
        .success(function() {
          console.log('declined!');
        });
    };
  });
