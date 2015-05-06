'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RulesCtrl
 * @description
 * # RulesCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ImmigrationmodelCtrl', function ($scope, $modalInstance) {


    $scope.close = function () {
      $modalInstance.dismiss('close');
    };
  });
