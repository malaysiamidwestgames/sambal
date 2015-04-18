'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('PaymentCtrl', function ($scope, $http, $location) {

    $scope.host = $location.host();

    $scope.payId = 0;

    $scope.paymentInit = function (regtype) {
      $http
        .post('/api/payments', {status: 'Processing payment', notification_params: 'nil', regtype: regtype, transaction_id: '0000', purchased_at: Date.now() })
        .success(function(data) {
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
