'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('PaymentCtrl', function ($scope, $http) {

    $scope.payId = 0;

    $scope.paymentInit = function () {
      $http
        .post('/api/payments', {status: 'Processing payment', notification_params: 'nil', regtype: 'General payment', transaction_id: '0000', purchased_at: Date.now() })
        .success(function(data) {
          console.log(data);
          $scope.payId = data.id;
        })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.setAmount = function(amount, regType) {
      $scope.amount = amount;
      $scope.regType = regType;
    };

  });
