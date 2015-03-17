'use strict';

angular.module('midwestApp')
  .controller('NavigationCtrl', function ($scope, $location, session) {
    $scope.waiting = {
      logoutResponse: false
    };

    $scope.logout = function() {
      $scope.waiting.logoutResponse = true;
      session.logout().then(function() {
        $scope.waiting.logoutResponse = false;
        $location.path('/');
      });
    };

  });
