'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ParkingCtrl
 * @description
 * # ParkingCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ParkingCtrl', function ($scope) {
    
    $scope.selected = '';

    $scope.select = function(location) {
      $scope.selected = location;
    };
  });
