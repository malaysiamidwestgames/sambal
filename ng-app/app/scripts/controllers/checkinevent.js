'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:CheckineventCtrl
 * @description
 * # CheckineventCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('CheckinEventCtrl', function ($scope, checkinResource, toastr) {
    $scope.newEvent = {};
    $scope.events = [];

    checkinResource.getEvents().then(function(events) {
      $scope.events = events.checkin_event;
    });

    $scope.createEvent = function() {
      checkinResource.createEvent($scope.newEvent)
        .then(function(cEvent) {
          $scope.events.push(cEvent.checkin_event);
          $scope.newEvent = {};
        });
    };

    $scope.deleteEvent = function(idx) {
      var cEvent = $scope.events[idx];
      checkinResource.deleteEvent({id: cEvent.id}).then(function() {
        toastr.success('Successfully deleted event', cEvent.name);
        $scope.events.splice(idx, 1);
      }, function() {
        toastr.error('Oops, something weird just happened.', 'Maybe reloading the page will help?');
      });
    };
  });
