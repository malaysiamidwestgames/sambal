'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('RegisterCtrl', function ($scope) {
    $scope.reg = function() {
      console.log($scope.email, $scope.pass1, $scope.pass2, $scope.school);
    }
  });
