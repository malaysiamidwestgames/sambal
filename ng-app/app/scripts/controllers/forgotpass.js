'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ForgotPassCtrl', function ($scope, $http, $timeout, $location) {
    $scope.waiting = {
      sendEmailResponse: false
    };

    $scope.sendEmail = function() {
      $scope.waiting.sendEmailResponse = true;
      $http
        .post('/api/password_resets/', {email: $scope.email})
        .success(function(req) {
          console.log(req);
          $scope.message = req.message;
          $scope.waiting.sendEmailResponse = false;
          $scope.hideEmail = true;
          $scope.hidepanel = true;
      	  $scope.success = true;
      	  $timeout(function() {
          $location.path('/');
      		}, 3000); 
        })
        .error(function(req) {
          console.log(req);
          $scope.errormessage = req.message;
    	    $scope.mailsent = true;
          $scope.waiting.sendEmailResponse = false;

        });

    };

  });
