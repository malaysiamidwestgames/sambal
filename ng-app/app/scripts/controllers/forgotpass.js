'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ForgotPassCtrl', function ($scope, $http) {

    $scope.sendemail = function() {
      console.log('asdas');
      $http
        .post('/api/password_resets/', {email: $scope.email});

    };

  });
