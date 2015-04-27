'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ModalInstanceCtrl
 * @description
 * # ModalInstanceCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.close = function () {
      $modalInstance.dismiss('close');
    };
  });
