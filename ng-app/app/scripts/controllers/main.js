'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('MainCtrl', function ($scope, universityResource, User, session, $location, $http, $routeParams, _) {
    $scope.reg = new User();
    $scope.signIn = {};
    $scope.universities = [];
    $scope.accountActivation = {
      visible: false,
      UserId: null
    };

    // redirect to dashboard for logged in users
    if (session.isLoggedIn()) {
      $location.path('/dashboard');
    }

    // populate email field if user came from account activation redirect
    if ($routeParams.email) {
      $scope.signIn.email = $routeParams.email;
    }

    universityResource().then(function(resp) {
      $scope.universities = resp.universities;
    });

    $scope.register = function() {
      $scope.reg.$save(function() {
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
          // clear query param if came from account activation redirect
          $location.url($location.path());
          $location.path('/dashboard');
        }, function(req) {
          $scope.signInError = req.data.message;
          // handle registered user but haven't activate account
          if (req.status === 403 && req.data.user_id !== null) {
            $scope.accountActivation.UserId = req.data.user_id;
            $scope.accountActivation.visible = true;
          }
        });
    };

    $scope.activateAccount = function() {
      // resend activation email
      $http.get('/api/users/activations/' + $scope.accountActivation.UserId)
        .success(function() {
          $location.path('/confirm_email');
        });
    };

  });
