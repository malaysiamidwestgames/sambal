'use strict';




angular.module('midwestApp')
  .controller('PassResetCtrl', function ($scope, $routeParams, httpWrapper, $location, $timeout) {
    var req = httpWrapper.patch('/api/password_resets/:id/');
    $scope.changepass = function() {
    req({id: $routeParams.token, email: $routeParams.email, password: $scope.pass1, password_confirmation: $scope.pass2}).
    then(function(){
      $scope.passResetform = true;
      $scope.isResetted = true;
      $scope.success = true;
      $scope.hidepanel = true;
      $scope.message = 'Password successfully reset! Redirecting to main page....';

      $timeout(function() {
          $location.path('/');
      }, 3000);
    }, function() {

      $scope.passResetform = true;
      $scope.isResetted = true;
      $scope.failure = true;
      $scope.hidepanel = true;
      $scope.message = 'Password FAILED to reset! Please contact us for support.';

    });

  };
});