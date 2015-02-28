'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('MainCtrl', function ($scope, universityResource, User, session, $location, _) {
    $scope.reg = new User();
    $scope.signIn = {};
    $scope.universities = [];

    universityResource().then(function(resp) {
      $scope.universities = resp.universities;
    });

    $scope.register = function() {
      $scope.reg.$save(function(resp) {
        $location.path('/confirm_email');
      }, function(resp) {
        $scope.registerErrors = [];
        _.each(resp.data, function(param, errors) {
          $scope.registerErrors.push(errors + ' ' + param);
        });
      });
    };

    $scope.signInUser = function() {
      session.login($scope.signIn.email, $scope.signIn.password)
        .then(function() {
          $location.path('/');
        }, function(req) {
          $scope.signInError = req.data.message;
        });
    };
  });
