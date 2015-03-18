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

    $scope.status = 'Processing payment';
    $scope.txnid = 'nil';
    $scope.notePrms = 'nil';
    $scope.purchaseTime = '12/12/12';
    $scope.amount = 0;
    $scope.regType = 'Yoo';
    $scope.payId = 0;

    $scope.paymentInit = function () {
      $http
        .post('/api/payments', {status: $scope.status, notification_params: $scope.notePrms, regtype: $scope.regType, transaction_id: $scope.txnid, purchased_at: $scope.purchaseTime  })
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
