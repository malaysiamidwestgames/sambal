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
    $scope.uniname = '';
    $scope.toggle = function(uniname) {
        $scope.uniname = uniname;

        $http.get('/api/users?name' + $scope.uniname)
        .success(function(data){
            console.log(data);
            $scope.users = data.users;
            console.log(data.password);
        });
    };

        $http.get('/api/users')
        .success(function(data){
            console.log(data);
            $scope.users = data.users;
            console.log(data.password);
        });

        $http.get('/api/universities/count')
        .success(function(data){
            $scope.universities = data.universities;
        });


  });