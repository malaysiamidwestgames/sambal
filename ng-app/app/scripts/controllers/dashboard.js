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
      $scope.genPayInit = false;
      $scope.spoPayInit = false;
      $http
        .get('/api/payments')
        .success(function(data) {
          var payments = data.payments;
          for ( var i = 0; i < payments.length; i++) {
            if (payments[i].regtype == 'General registration' && payments[i].status =='Processing payment') {
              $scope.genPayInit = true;
            }
            else if (payments[i].regtype == 'Sports registration' && payments[i].status =='Processing payment') {
              $scope.genPayInit = true;
            }
            else if(payments[i].regtype == 'General registration' && payments[i].status == 'Completed') {
              $scope.general = true;
            }
            else if(payments[i].regtype == 'Sports registration' && payments[i].status == 'Completed') {
              $scope.sports = true;
            }
          }
        })
        .error(function(error) {
          console.log(error);
        })
    })
  });
