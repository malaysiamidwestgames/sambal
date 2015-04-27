'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ModalInstanceCtrl
 * @description
 * # ModalInstanceCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ModalInstanceCtrl', function ($scope, $http, $modalInstance, payId, amount) {

    $scope.payId = payId;
    $scope.amount = amount;
    $scope.size = '';

    $scope.paymentInit = function (regtype) {
      $http
        .post('/api/payments', {status: 'Payment initiated', notification_params: 'nil', regtype: regtype, transaction_id: '0000', purchased_at: Date.now(), amount: $scope.amount })
        .success(function(data) {

          $scope.payId = data.id;
          $http
            .get('/api/payupdate?payment_id=' + $scope.payId)
            .success(function() {
            });
        })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.setBucket = function(size) {
      $scope.amount += 20;
      $scope.size = size;
    };

    $scope.setAmount = function(amount, regType) {
      $scope.amount = amount;
      $scope.regType = regType;
    };
    $scope.close = function () {
      $modalInstance.dismiss('close');
    };
  });
