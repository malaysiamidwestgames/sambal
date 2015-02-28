'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('UserlistCtrl', function ($scope, $http) {
    $scope.participants = undefined;
    	$http.get('/api/users')
    	.success(function(data){
    		console.log(data);
    		$scope.users = data.users;
    		console.log(data.password);
    	});
  });

