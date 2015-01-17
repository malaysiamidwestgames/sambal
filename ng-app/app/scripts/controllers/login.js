'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('LoginCtrl', function ($scope, $http ) {
	$scope.submit = function() {

	  $http.post ('/', {email: $scope.email, password: $scope.password});
    };

  });
