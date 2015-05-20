'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:PdfmodalCtrl
 * @description
 * # PdfmodalCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('PdfmodalCtrl', function ($scope, $modal, $http) {

    var explanation = [{
      name: 'Knockout',
      meaning: 'A vs B. Whoever loses will be eliminated.'
    }, {
      name: 'League-2 Knockout',
      meaning: 'Teams are split into 2 groups. Top two teams will be determined by round robin within each group. Top two teams of each group will advance to knockout rounds.'
    }, {
      name: 'League-4 Knockout',
      meaning: 'Teams are split into 4 groups. Top two teams will be determined by round robin within each group. Top two teams of each group will advance to knockout rounds.'
    }, {
      name: 'Round Robin',
      meaning: 'Everybody plays everybody! Winning gets 3 points, drawing gets 1 point, losing gets 0 points.'
    }, {
      name: 'Team Race',
      meaning: 'Teams cooperate in a race. All members must cross the finish line to finish.'
    }, {
      name: 'Judging',
      meaning: 'Teams will take turns performing. The judges will judge based on the criteria given.'
    }];

    $scope.games = [];
    $scope.selectedSport = {};
    $http.get('/api/sports')
      .success(function(data){
        $scope.sports = [{
          id: 0,
          name: 'General Rules'
        }];
        data.sports.forEach(function(entry){
          $scope.sports.push(entry);
        });
        $scope.sports.forEach(function(entry) {
          entry.link = 'assets/MMG2015_' + entry.name + '.pdf';
        });
        $scope.selectedSport = $scope.sports[0];
      });

    $scope.$watch('selectedSport', function(){
      $http.get('/api/games/sports/' + $scope.selectedSport.id)
        .success(function(data) {
          $scope.selectedSport.games = [];
          data.games.forEach(function(entry){
            $scope.selectedSport.games.push(entry);
          });
          $scope.selectedSport.games.forEach(function(entry){
            explanation.forEach(function(one){
              if (entry.tournament_type === one.name) {
                entry.meaning = one.meaning;
              }
            });
          });
        });
    });

    $scope.open = function (size) {
      $modal.open({
        templateUrl: 'rules.html',
        controller: 'RulesCtrl',
        size: size,
        resolve: {
          selectedSport: function () {
            return $scope.selectedSport;
          }
        }
      });
    };
  });
