'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:VolunteerCtrl
 * @description
 * # VolunteerCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('VolunteerCtrl', function ($scope, $http, $modalInstance, session) {
    $scope.sleeveSize = '';
    $scope.shirtSize = '';
    $scope.products = [];
    $scope.myId = 0;
    $scope.start = true;
    $scope.bottom = false;

    session.getUser().then(function(user) {
      $scope.myId = user.id;
    });


    console.log($scope);
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

    $scope.signUp = function () {
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

    $scope.update = function(result) {
      $scope.bottom = result;
    };

    $scope.goToNext = function() {
      $scope.start = false;
    };

    $scope.close = function () {
      $modalInstance.dismiss('close');
    };
  });

