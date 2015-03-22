'use strict';


angular.module('midwestApp')
  .controller('ContctUsCtrl', function ($scope, session) {
    if (session.isLoggedIn()) {
      session.getUser().then(function(user) {
        $scope.name = user.first_name;
        $scope.email = user.email;
      });
    }
  });