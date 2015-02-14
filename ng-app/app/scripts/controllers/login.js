'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('LoginCtrl', function ($scope, $http, $window, $location, session) {

    $scope.login = function() {
      session.login($scope.email, $scope.password)
        .then(function() {
          $location.path('/');
        }, function(req) {
          $scope.errorMessage = req.data.message;
        });
    };

  });
