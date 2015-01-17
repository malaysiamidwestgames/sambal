'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('LoginCtrl', function ($scope) {
	$scope.submit = function() {
      console.log($scope.email,$scope.password);
    };

  });
