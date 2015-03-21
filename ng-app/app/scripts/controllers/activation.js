'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ActivationCtrl
 * @description
 * # ActivationCtrl
 * Controller of the midwestApp
 */


angular.module('midwestApp')
  .controller('ActivationCtrl', function ($scope, $routeParams, $timeout, $location, $http, httpWrapper) {
    $scope.calledApi = false;
    $scope.accountActivation = {
      visible: false,
      UserId: null
    };
    $scope.waiting = {
      activateAccountResponse: false
    };

    var accountActivationReq = httpWrapper.patch('/api/account_activations/:token/');

    accountActivationReq({token: $routeParams.token, email: $routeParams.email})
      .then(function(){
        $scope.calledApi = true;
        $scope.isActivated = true;
        // redirect to homepage so user can login
        $timeout(function() {
          $location.path('/');
        }, 3000);
      }, function(res) {
        $scope.calledApi = true;
        $scope.isActivated = false;
        /* jshint -W106 */
        if (res.data.user_id !== undefined) {
          $scope.accountActivation.visible = true;
          $scope.accountActivation.UserId = res.data.user_id;
        }
        /* jshint +W106 */
      });

    $scope.activateAccount = function() {
      $scope.waiting.activateAccountResponse = true;
      // resend activation email
      $http.get('/api/users/activations/' + $scope.accountActivation.UserId)
        .success(function() {
          $scope.waiting.activateAccountResponse = false;
          $location.path('/confirm_email');
        });
    };


});