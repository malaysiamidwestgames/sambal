'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:CheckineventinfoCtrl
 * @description
 * # CheckineventinfoCtrl
 * Controller of the midwestApp
 */
 angular.module('midwestApp')
 .controller('CheckinEventInfoCtrl', function ($scope, $routeParams, checkinResource, toastr) {
  var event_id = $routeParams.id;
  checkinResource.getEvents({id: event_id}).then(function(cEvent) {
    $scope.cEvent = cEvent.checkin_event;
  });

  $scope.checkinUser = function() {
    if ($scope.uid) {
      checkinResource.checkin({user_id: $scope.uid, checkin_event_id: event_id})
      .then(function(checkin) {
        $scope.cEvent = checkin.checkin.checkin_event;
        $scope.uid = '';
        toastr.success('Successfully checked in', checkin.checkin.user.firstname);
      }, function(error) {
        $scope.uid = '';
        toastr.error('this guy is trying to fool us', error.friendlyText);
      });
    }
  };

  $scope.deleteCheckin = function(idx) {
    var checkin = $scope.cEvent.checkins[idx];
    checkinResource.deleteCheckin({id: checkin.id}).then(function() {
      $scope.cEvent.checkins.splice(idx, 1);
      toastr.success('Successfully deleted checkin');
    }, function() {
      toastr.error('Try reload the page', 'Oops, something is wrong.');
    });
  };
});
