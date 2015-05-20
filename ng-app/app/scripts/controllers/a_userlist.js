'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:AdminUserlistCtrl
 * @description
 * # AdminUserlistCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('AdminUserlistCtrl', function ($scope, $http) {
    $scope.participants = undefined;
    $scope.uniname = '';
    $scope.orderByField = '';
    $scope.reverseSort = false;
    $scope.toggle = function(uniname) {
      $scope.uniname = uniname;

      $http.get('/api/users?name' + $scope.uniname)
        .success(function(data) {
          $scope.users = data.users;
        });
    };

    $http.get('/api/users')
      .success(function(data) {
        $scope.users = data.users;
        $scope.users.forEach(function(user) {
          if (user.registration_payment_status) {
            user.registration_payment_status = 'Paid';
          } else {
            user.registration_payment_status = 'Unpaid';
          }
        });
      });

    $http.get('/api/universities/count')
      .success(function(data) {
        $scope.universities = data.universities;
      });
  });
