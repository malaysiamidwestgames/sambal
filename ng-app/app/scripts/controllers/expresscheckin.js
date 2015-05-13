'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ExpresscheckinCtrl
 * @description
 * # ExpresscheckinCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('ExpresscheckinCtrl', function ($scope, checkinResource, $routeParams) {
    var userId = $routeParams.userId;
    checkinResource.checkin({user_id: userId}).then(function(checkin) {
      $scope.checkin = checkin.checkin;
    }, function(error) {
      $scope.error = error.friendlyText;
    });
  });
