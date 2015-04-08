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
      title: 'Register for sports',
      label: 'Register now',
      link: 'sportsreg'
    },
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

      //TODO: Call API to read all games that the player is playing and display it on sports tab
      $http.get('api/participants/get/?user_id=' + user.id)
        .success(function(result){
          $scope.participating = result.participants;

          $scope.$watch('participating', function() {
            $scope.participating.forEach(function(participate){
              console.log(participate.team_id);
              $http.get('/api/teams/' + participate.team_id)
                .success(function(data){
                  participate.name = data.team.name;
                })
            });
          });
        });


    });
  });
