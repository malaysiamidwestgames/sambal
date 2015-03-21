'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:InfoCtrl
 * @description
 * # InfoCtrl
 * Controller of the midwestApp
 */

angular.module('midwestApp').controller('InfoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Basketball',
      content: '1. Forfeits'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false

  };
});

