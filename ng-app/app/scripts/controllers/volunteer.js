'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:VolunteerCtrl
 * @description
 * # VolunteerCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('VolunteerCtrl', function ($scope, $http, $modalInstance, session, isVolunteer) {
    $scope.phoneno = '';
    $scope.shirtSize = '';
    $scope.myId = 0;
    $scope.start = true;
    $scope.bottom = false;
    $scope.isVolunteer = isVolunteer;

    session.getUser().then(function(user) {
      $scope.myId = user.id;
    });

    $scope.signUp = function () {
      console.log($scope.shirtSize);
      $http
        .post('/api/volunteers', {
          user_id: $scope.myId,
          shirt_size: $scope.shirtSize,
          phone_number: $scope.phoneno
        })
        .success(function() {
          console.log('success');
          toastr.success('Awesome! Your contingent is loving your contributions', 'Congratulations! You are now a part of MMG 2015 Volunteer Family - the backbone of success!');
          $modalInstance.close(true);
        });
    };

    $scope.update = function(result) {
      $scope.bottom = result;
    };

    $scope.goToNext = function() {
      $scope.start = false;
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('close');
    };
  });

