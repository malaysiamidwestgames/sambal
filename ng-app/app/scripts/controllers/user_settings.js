'use strict';

angular.module('midwestApp')
  .controller('UserSettingsCtrl', function ($scope, $rootScope) {
    $scope.user = $rootScope.currentUser.user;
  });
