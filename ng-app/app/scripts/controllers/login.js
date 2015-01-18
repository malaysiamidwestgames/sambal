'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('LoginCtrl', function ($scope, $http, $window) {
	$scope.submit = function() {
	  $http
      .post('/api/sessions', {email: $scope.email, password: $scope.password})
      .success(function(data, status, headers, config) {
        // $window.sessionStorage.token = data.token;
        console.log('log in success')
        // test auth
        $http.get('/api/users/me').success(function(user){
          console.log(user);
        })

        
      })
      .error(function(data, status, headers, config) {
        delete $window.sessionStorage.token;
        console.log('faill')      
      });
    };

  });
