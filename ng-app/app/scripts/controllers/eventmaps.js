'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:EventmapsCtrl
 * @description
 * # EventmapsCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
  .controller('EventmapsCtrl', function ($scope) {
    $scope.map = {
      center: { latitude: 42.2814, longitude : -83.7483},
      zoom: 12,
      control: {},
      routes: {
        start: [
          {name: 'Central Campus Recreation Building', latlng: '42.278201,-83.732710 '},
          {name: 'Mitchell Field', latlng: '42.285748,-83.719478'},
          {name: 'Sports Coliseum', latlng: '42.272019,-83.745893 '}
        ],
        end: [
          {name: 'Central Campus Recreation Building', latlng: '42.278201,-83.732710 '},
          {name: 'Mitchell Field', latlng: '42.285748,-83.719478'},
          {name: 'Sports Coliseum', latlng: '42.272019,-83.745893 '}
        ]
      }
    };
    $scope.routePoints = {
      start: {},
      end: {}
    };
    $scope.routePoints.start = $scope.map.routes.start[0];
    $scope.routePoints.end = $scope.map.routes.end[0];

    var directionsDisplay = new google.maps.DirectionsRenderer();

    $scope.calcRoute = function (routePoints) {
      directionsDisplay.setMap($scope.map.control.getGMap());
      directionsDisplay.setPanel(document.getElementById('panel'));
      var directionsService = new google.maps.DirectionsService();
      var start = routePoints.start.latlng;
      var end = routePoints.end.latlng;
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          console.log(response)
        }
      });
      return;
    };
  });
