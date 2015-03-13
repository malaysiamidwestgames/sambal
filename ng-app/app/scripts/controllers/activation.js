'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ActivationCtrl
 * @description
 * # ActivationCtrl
 * Controller of the midwestApp
 */


angular.module('midwestApp')
  .controller('ActivationCtrl', function ($scope, $routeParams, $timeout, $location, httpWrapper) {
    $scope.calledApi = false;
    $scope.serverBusy = false;
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
      }, function() {
        $scope.calledApi = true;
        $scope.isActivated = false;
      });


});