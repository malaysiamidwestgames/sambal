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
    $scope.waiting = {
      registerResponse: false,
      loginResponse: false
    };

    // populate email field if user came from account activation redirect
    if ($routeParams.email) {
      $scope.signIn.email = $routeParams.email;
    }

    universityResource().then(function(resp) {
      $scope.universities = resp.universities;
    });

    $scope.register = function() {
      $scope.waiting.registerResponse = true;
      $scope.reg.$save(function() {
        $location.path('/confirm_email');
      }, function(resp) {
        $scope.waiting.registerResponse = false;
        $scope.registerErrors = [];
        _.each(resp.data, function(param, errors) {
          $scope.registerErrors.push(errors + ' ' + param);
        });
      });
    };

    $scope.signInUser = function() {
      $scope.waiting.loginResponse = true;
      session.login($scope.signIn.email, $scope.signIn.password)
        .then(function() {
          // clear query param if came from account activation redirect
          $location.url($location.path());
          $scope.waiting.loginResponse = false;
          $location.path('/dashboard');
        }, function(req) {
          $scope.waiting.loginResponse = false;
          $scope.signInError = req.data.message;
          // handle registered user but haven't activate account
          if (req.status === 403 && req.data.user_id !== null) {
            $scope.accountActivation.UserId = req.data.user_id;
            $scope.accountActivation.visible = true;
          }
        });
    };

    $scope.activateAccount = function() {
      $scope.waiting.loginResponse = true;
      // resend activation email
      $http.get('/api/users/activations/' + $scope.accountActivation.UserId)
        .success(function() {
          $scope.waiting.loginResponse = false;
          $location.path('/confirm_email');
        });
    };

    var noUniversityHandler = function(isChecked) {
       if (isChecked) {
        $scope.reg.university = 'Free Agent';
      } else {
        $scope.reg.university = '';
      }
    };

    $scope.$watch('noUniversityCheckbox', noUniversityHandler);

  });
