'use strict';

angular.module('midwestApp')
  .controller('NavigationCtrl', function ($scope, $location, session) {
    $scope.logout = function() {
      session.logout().then(function() {
        $location.path('/');
        console.log('logging out');
      });
    };

  });
