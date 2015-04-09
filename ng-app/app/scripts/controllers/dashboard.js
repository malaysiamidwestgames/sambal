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
      console.log(user.id);

      //TODO: Call API to read all games that the player is playing and display it on sports tab
      $http.get('api/participants/get/?user_id=' + user.id)
        .success(function(result){
          console.log(result);
        });

      $http.post('api/participants/join', {team_id: 1, user_id:user.id})
        .success(function(result){
          console.log(result);
        });

      $http.post('api/participants', {team_id: 2, user_id:user.id})
        .success(function(result){
          console.log(result);
        });
    });
  });
