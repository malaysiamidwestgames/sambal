'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:HotelsCtrl
 * @description
 * # HotelsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('HotelsCtrl', function ($scope) {
    $scope.hotels = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
