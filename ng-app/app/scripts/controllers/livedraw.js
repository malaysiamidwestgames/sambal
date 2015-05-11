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

    $scope.selectedSport = {};
    $http.get('/api/games')
      .success(function(data){
        $scope.games = data.games;
        //console.log($scope.games);
        $scope.games.forEach(function(game) {
          game.link = 'assets/MMG2015_' + game.name + '.pdf';
        });
        /*$scope.sports = [{
          id: 0,
          name: 'General Rules'
        }];
        data.sports.forEach(function(entry){
          $scope.sports.push(entry);
        });
        $scope.sports.forEach(function(entry) {
          entry.link = 'assets/MMG2015_' + entry.name + '.pdf';
        });
        $scope.selectedSport = $scope.sports[0];*/
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
