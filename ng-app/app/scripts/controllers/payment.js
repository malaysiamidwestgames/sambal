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

    angular.element(document).ready(function (){
      $scope.general = false;
      $scope.sports = false;
      $http
        .get('/api/payments')
        .success(function(data) {
          var payments = data.payments;
          for ( var i = 0; i < payments.length; i++) {
            if(payments[i].regtype == 'General registration') {
              $scope.general = true;
            }
            else if(payments[i].regtype == 'Sports registration') {
              $scope.sports = true;
            }
          }
        })
        .error(function(error) {
          console.log(error);
        })
    })

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
