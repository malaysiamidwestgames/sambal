'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('RegisterCtrl', function ($scope, $http, $location, session) {
    $scope.register = function() {
      $http
        .post('/api/users', {email: $scope.email, password: $scope.pass1, password_confirmation: $scope.pass2})
        .success(function(user) {
          console.log('success');
          console.log(user);
          session.login($scope.email, $scope.pass1)
            .then(function() {
              $location.path('/');
            }, function(req) {
              $scope.errorMessage = req.data.message;
            });
        })
        .error(function(error) {
          console.log('error login in');
          console.log(error);

        });
    };
  });

angular.module('ui.bootstrap')
.controller('TypeaheadCtrl', function($scope, $http) {
	$scope.selected = undefined;
   	$http.get('/api/universities')
   	.success(function(data){
   		$scope.universities = data;
	});

});
	
