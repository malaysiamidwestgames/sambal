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
        XL: 0,
        XXL: 0,
        XXXL: 0
      },
      Long: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
        XXXL: 0
      }
    };
    $scope.products = [];
    $scope.myId = 0;

    session.getUser().then(function(user) {
      $scope.myId = user.id;
    });

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

    $scope.order = function () {
      for (var sleeveTypeName in $scope.shirt) {
         if ($scope.shirt.hasOwnProperty(sleeveTypeName)) {
           var sleeveObj = $scope.shirt[sleeveTypeName];
           for (var sizeName in sleeveObj) {
             if (sleeveObj.hasOwnProperty(sizeName)) {
               var quantity = sleeveObj[sizeName];
               if (quantity !== 0) {
                 var id = findProductId(sleeveTypeName, sizeName);
                 $http
                   .get('/api/orders/create?=user_id=' + $scope.myId + '&product_id=' + id + '&quantity=' + quantity);
               }
             }
           }
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
    $scope.close = function () {
      $modalInstance.dismiss('close');
    };


  });
