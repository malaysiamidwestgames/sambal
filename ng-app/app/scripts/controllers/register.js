'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('RegisterCtrl', function ($scope, $http) {
    $scope.reg = function() {
      $http
        .post('/api/users', {email: $scope.email, password: $scope.pass1, password_confirmation: $scope.pass2});
    };
  });

angular.module('ui.bootstrap')
.controller('TypeaheadCtrl', function($scope, $http) {
	$scope.selected = undefined;
   	$http.get('/api/universities')
   	.success(function(data){
   		$scope.universities = data;
	});

	//$scope.universities = ['herro','pundek']

});
	
