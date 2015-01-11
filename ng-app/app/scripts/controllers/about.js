'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
