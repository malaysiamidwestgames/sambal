'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:PointsCtrl
 * @description
 * # PointsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('PointsCtrl', function ($scope) {
    $scope.explanation = 'If contingent has at least one team that is participating in a game, they will get 5 points.';
  });
