'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:SportsregCtrl
 * @description
 * # SportsregCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('SportsregCtrl', function ($scope, $http) {

    $scope.payId = 0;
    $scope.sports = [];
    $scope.selectedAction = {
      name: 'Please choose a sports you would like to register'
    };

    /*$scope.todos = [
      {
        title: 'Register for sports',
        label: 'Register now',
        link: 'sportsreg'
      },
      {
        title: 'Audition for Midwest Night',
        label: 'More info',
        link: 'promo/auditions'
      }];
*/
    $http.get('/api/allsports')
      .success(function(data){
        $scope.sports = data.allsports;
      });

    $scope.setAction = function(action) {
      $scope.selectedAction = action;
    };

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
