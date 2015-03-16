'use strict';

angular.module('midwestApp')
  .controller('UserSettingsCtrl', function ($scope, $rootScope, universityResource, User, session, $timeout, $location) {
    $scope.universities = [];

    console.log('in user settings');
    // session.on('userAvailable', function() {
    //   $scope.editedUser = new User({id: $rootScope.currentUser.user.id});
    //   $scope.editedUser.first_name = $rootScope.currentUser.user.first_name;
    //   $scope.editedUser.last_name = $rootScope.currentUser.user.last_name;
    //   $scope.editedUser.university = $rootScope.currentUser.user.university.name;
    //   $scope.editedUser.email = $rootScope.currentUser.user.email;
    // });

    // temporary solution 
    $timeout(function() {
      $scope.editedUser = new User({id: 'me'});
      $scope.editedUser.first_name = $rootScope.currentUser.user.first_name;
      $scope.editedUser.last_name = $rootScope.currentUser.user.last_name;
      $scope.editedUser.university = $rootScope.currentUser.user.university.name;
      $scope.editedUser.email = $rootScope.currentUser.user.email;
    }, 1500);

    universityResource().then(function(resp) {
      $scope.universities = resp.universities;
    });

    $scope.updateUserInfo = function() {
      $scope.editedUser.$update(function(resp) {
        $rootScope.currentUser.user = resp.user;
        $location.path('/dashboard');
      }, function(resp) {
        console.log('fail', resp);
      });
    };

  });
