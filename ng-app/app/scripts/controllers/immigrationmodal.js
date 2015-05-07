'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RulesCtrl
 * @description
 * # RulesCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ImmigrationmodelCtrl', function ($scope, $modalInstance, selectedService) {

  	$scope.selectedService = selectedService;

    $scope.close = function () {
      $modalInstance.dismiss('close');
    };
  });
