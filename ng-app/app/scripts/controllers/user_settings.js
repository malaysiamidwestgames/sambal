'use strict';

angular.module('midwestApp')
  .controller('UserSettingsCtrl', function ($scope, $rootScope, universityResource, User, session, $timeout, $location) {
    $scope.universities = [];
    $scope.isReady = false;
    $scope.isError = false;

    session.checkCurrentUser();

    session.on('userAvailable', function() {
      $scope.editedUser = new User({id: 'me'});
      $scope.editedUser.first_name = $rootScope.currentUser.user.first_name;
      $scope.editedUser.last_name = $rootScope.currentUser.user.last_name;
      $scope.editedUser.university = $rootScope.currentUser.user.university.name;
      $scope.editedUser.email = $rootScope.currentUser.user.email;
      $scope.isReady = true;
    });

    universityResource().then(function(resp) {
      $scope.universities = resp.universities;
    });

    $scope.updateUserInfo = function() {
      $scope.isReady = false;
      $scope.editedUser.$update(function(resp) {
        $rootScope.currentUser.user = resp.user;
        $scope.isReady = true;
        $location.path('/dashboard');
      }, function(resp) {
        $scope.isError = true;
        $scope.isReady = true;
        console.log('Failed to update user info, response : ', resp);
      });
    };

  });
