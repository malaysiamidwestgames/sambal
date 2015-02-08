'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:PaylistCtrl
 * @description
 * # PaylistCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('PaylistCtrl', function ($scope, $http) {
    $scope.payments = [];
    $http.get('/api/payments')
      .success(function(data){
        console.log(data);
        $scope.payments = data.payments;
        $scope.users = data.users;
      });

  });
