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
    $scope.serverBusy = false;
    $scope.accountActivation = {
      visible: false,
      UserId: null
    };
    var accountActivationReq = httpWrapper.patch('/api/account_activations/:token/');

    accountActivationReq({token: $routeParams.token, email: $routeParams.email})
      .then(function(){
        $scope.calledApi = true;
        $scope.isActivated = true;
        $scope.serverBusy = true;
        // redirect to homepage so user can login
        $timeout(function() {
          $location.path('/');
        }, 3000);
      }, function(res) {
        $scope.calledApi = true;
        $scope.isActivated = false;
        if (res.data.user_id !== undefined) {
          $scope.accountActivation.visible = true;
          $scope.accountActivation.UserId = res.data.user_id;
        }
      });

    $scope.activateAccount = function() {
      $scope.serverBusy = true;
      // resend activation email
      $http.get('/api/users/activations/' + $scope.accountActivation.UserId)
        .success(function() {
          $location.path('/confirm_email');
        });
    };


});