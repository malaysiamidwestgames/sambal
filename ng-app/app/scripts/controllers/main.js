'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
