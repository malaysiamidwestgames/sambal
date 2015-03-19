'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('DashboardCtrl', function ($scope,$http) {

    angular.element(document).ready(function (){
      $scope.general = false;
      $scope.sports = false;
      $scope.payInit = false;
      $http
        .get('/api/payments')
        .success(function(data) {
          var payments = data.payments;
          for ( var i = 0; i < payments.length; i++) {
            if (payments[i].regtype == 'General payment') {
              $scope.payInit = true;
            }
            else if(payments[i].regtype == 'General registration') {
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
  });
