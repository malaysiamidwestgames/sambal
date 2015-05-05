'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ShirtCtrl
 * @description
 * # ShirtCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ShirtCtrl', function ($scope, $http, $modalInstance, payId, amount, session) {

    $scope.payId = payId;
    $scope.amount = amount;
    $scope.size = '';
    $scope.shirt = {
      Short: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0
      },
      Long: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0
      }
    };
    $scope.orders = [];
    $scope.products = [];
    $scope.myId = 0;

    session.getUser().then(function(user) {
      $scope.myId = user.id;
    });

    $scope.paymentInit = function () {
      $http
        .post('/api/payments', {status: 'Payment initiated', notification_params: 'nil', regtype: $scope.regtype, transaction_id: '0000', purchased_at: Date.now(), amount: $scope.amount })
        .success(function(data) {

          $scope.payId = data.id;
          $http
            .get('/api/payupdate?payment_id=' + $scope.payId)
            .success(function() {
              console.log('paid, now making order!');
              $scope.makeOrder().then(function() {
                toastr.options.timeOut = 0;
                toastr.options.extendedTimeOut = 0;
                toastr.success('Your order is successful!','You made a wise choice');
                $scope.close();
              });
            }).error(function() {
              toastr.options.timeOut = 0;
              toastr.options.extendedTimeOut = 0;
              toastr.error('Your order is not successfull!', 'Please try again later');
            });
        })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.makeOrder = function() {
      $scope.orders.forEach(function(order) {
        $http
          .get('/api/orders/create?product_id=' + order.id + '&quantity=' + order.quantity)
          .success(function() {
            console.log('success');
          });
      });
    };

    $http
      .get('/api/products')
      .success(function(data) {
        $scope.products = data.products;
      });

    var findProductId = function(sleeve, size) {
      for (var i = 0; i < $scope.products.length; ++i) {
        if ($scope.products[i].name === ('MMG2015 Official Shirt ' + sleeve + ' Sleeve') &&
          $scope.products[i].size === size) {
          console.log($scope.products[i]);
          return $scope.products[i].id;
        }
      }
    };


    $scope.setBucket = function(size) {
      $scope.amount += 20;
      $scope.size = size;
    };

    $scope.setAmount = function(amount, regType) {
      $scope.amount = amount;
      $scope.regType = regType;
    };

    $scope.order = function () {
      var short = 0;
      var long = 0;
      $scope.amount = 0;
      for (var sleeveTypeName in $scope.shirt) {
        if ($scope.shirt.hasOwnProperty(sleeveTypeName)) {
          var sleeveObj = $scope.shirt[sleeveTypeName];
          for (var sizeName in sleeveObj) {
            if (sleeveObj.hasOwnProperty(sizeName)) {
              var quantity = sleeveObj[sizeName];
              if (quantity !== 0) {
                var id = findProductId(sleeveTypeName, sizeName);
                if (sleeveTypeName === 'Long') {
                  long += quantity;
                } else {
                  short += quantity;
                }
                $scope.orders.push({id: id, quantity: quantity});
                /**/
              }
            }
          }
        }
      }
      if (short === 1) {
        $scope.amount += 15;
      } else {
        $scope.amount += (short * 12.5);
      }

      if (long === 1) {
        $scope.amount += 20;
      } else {
        $scope.amount += (long * 17.5);
      }
      console.log($scope.orders);
    };

    $scope.close = function () {
      $modalInstance.dismiss('close');
    };


  });
