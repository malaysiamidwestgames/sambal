'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')

  .controller('DashboardCtrl', function ($scope,$http, session) {
    $scope.todos = [];

    session.getUser().then(function(user) {
      if (user.registration_payment_status === 'Payment pending') {
        $scope.todos.push({
          title: 'Pay for registration',
          label: 'Pay now',
          link: 'payment'
        });
      }
    });
  });
