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
      name: "Knockout",
      meaning: "A vs B. Whoever loses will be eliminated."
    }, {
      name: "League-2 Knockout",
      meaning: "Split into 2 groups then knockout. Top two teams in group will proceed to knockout."
    }, {
      name: "League-4 Knockout",
      meaning: "Split into 4 groups then knockout. Top team in group will proceed to knockout."
    }, {
      name: "Round Robin",
      meaning: "Everybody plays everybody! Winning gets 3 points, drawing gets 1 point, losing gets 0 points."
    }, {
      name: "Team Race",
      meaning: "Teams cooperate in the race. All members must cross the finish line to finish."
    }];

    $scope.games = [];
    $scope.selectedSport = {};
    $http.get('/api/sports')
      .success(function(data){
        $scope.sports = [{
          id: 0,
          name: "General Rules"
        }];
        data.sports.forEach(function(entry){
          $scope.sports.push(entry);
        });
        $scope.sports.forEach(function(entry) {
          entry.link = "assets/" + entry.name + ".pdf";
        });
        $scope.selectedSport = $scope.sports[0];
      });

    $scope.$watch('selectedSport', function(data){
      $http.get('/api/games/sports/' + $scope.selectedSport.id)
        .success(function(data) {
          $scope.selectedSport.games = [];
          data.games.forEach(function(entry){
            $scope.selectedSport.games.push(entry);
          });
          $scope.selectedSport.games.forEach(function(entry){
            console.log(explanation);
            explanation.forEach(function(one){
              if (entry.tournament_type == one.name) {
                entry.meaning = one.meaning;
              }
            });
          });
          console.log($scope.selectedSport);
        });
    });

    $scope.open = function (size) {
      var modalInstance = $modal.open({
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
