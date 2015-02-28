'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ForgotPassCtrl', function ($scope, $http, $location, session) {

    $scope.sendemail = function() {
      $http
        .post('/api/password_resets', {email: $scope.email})

    }

  });
