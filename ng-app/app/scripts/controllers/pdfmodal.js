'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:PdfmodalCtrl
 * @description
 * # PdfmodalCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('PdfmodalCtrl', function ($scope, $modal, $http, $sce) {

    $scope.games = [];
    $scope.selectedSport = {};
    $scope.rules = $sce.trustAsResourceUrl($scope.selectedSport.link);
    $http.get('/api/sports')
      .success(function(data){
        $scope.sports = data.sports;
        $scope.sports.forEach(function(entry) {
          entry.link = "assets/" + entry.name + ".pdf";
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
