'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ConsularModalCtrl
 * @description
 * # ConsularModalCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ConsularModalCtrl', function ($scope, $modalInstance, selectedService) {
  	console.log(selectedService);

  	$scope.selectedService = selectedService;

    $scope.close = function () {
      $modalInstance.dismiss('close');
    };
  });
