'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('UserlistCtrl', function ($scope, $http, $location) {
    $scope.participants = undefined;
	$http.get('/api/users')
		.success(function(data){
			$scope.users = data.users;
		})
  });

