'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:LivedrawCtrl
 * @description
 * # LivedrawCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('LivedrawCtrl', function ($scope, $modal, $http) {
    var offset = new Date().getTimezoneOffset();
    console.log(offset);
    var options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    $scope.selectedSport = {};
    $http.get('/api/games')
      .success(function(data){
        $scope.games = data.games;
        $scope.games.forEach(function(game) {
          game.link = 'assets/MMG2015_' + game.name + '.pdf';
          if (game.live_draw_session) {
            console.log('ori: ' + game.live_draw_session);
            var session = moment(game.live_draw_session).tz('America/Los_Angeles').format('ddd MMM D YYYY, h:mm a');
            console.log('new: ' + session);
            game.live_draw_session = session.toLocaleString('en-us', options);
          } else {
            game.live_draw_session = 'No Draws';
          }
        });
      });

    $scope.open = function (game) {
      console.log(game);
      $modal.open({
        templateUrl: 'rules.html',
        controller: 'RulesCtrl',
        size: 'lg',
        resolve: {
          selectedSport: function () {
            return game;
          }
        }
      });
    };
  });
