'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RulesCtrl
 * @description
 * # RulesCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('RulesCtrl', function ($scope, $modalInstance, selectedSport) {

    $scope.selectedSport = selectedSport;

    $scope.close = function () {
      $modalInstance.dismiss('close');
    };
  });
