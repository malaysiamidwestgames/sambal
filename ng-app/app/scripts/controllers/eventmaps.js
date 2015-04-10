'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:EventmapsCtrl
 * @description
 * # EventmapsCtrl
 * Controller of the midwestApp
 */

angular.module('midwestApp')
  .controller('EventmapsCtrl', function ($scope, $http) {
    $scope.map = {
      center: { latitude: 42.2814, longitude : -83.7483},
      zoom: 12,
      control: {},
      routes: {
        start: [
          {name: 'CCRB', address: '401 Washtenaw Avenue, Ann Arbor, Michigan 48109'},
          {name: 'Mitchell Field', address: '1910 Fuller Road, Ann Arbor, MI 48105'},
          {name: 'Coliseum', address: '721 S. Fifth Ave, Ann Arbor, MI 48104 '},
          {name: 'Mason Hall', address: '505 South State Street, Ann Arbor, MI 48109'},
          {name: 'Colonial Lanes', address:'950 South Industrial Highway, Ann Arbor, MI 48104'}
        ],
        end: [
          {name: 'CCRB', address: '401 Washtenaw Avenue, Ann Arbor, Michigan, 48109'},
          {name: 'Mitchell Field', address: '1910 Fuller Road, Ann Arbor, MI 48105'},
          {name: 'Coliseum', address: '721 S. Fifth Ave, Ann Arbor, MI 48104'},
          {name: 'Mason Hall', address: '505 South State Street, Ann Arbor, MI 48109'},
          {name: 'Colonial Lanes', address:'950 South Industrial Highway, Ann Arbor, MI 48104'}
        ]
      }
    };
    $scope.routePoints = {
      start: {},
      end: {}
    };
    $scope.routePoints.start = $scope.map.routes.start[0];
    $scope.routePoints.end = $scope.map.routes.end[0];
    $scope.businesses = [];

    var directionsDisplay = new google.maps.DirectionsRenderer();

    $scope.calcRoute = function (routePoints) {
      directionsDisplay.setMap($scope.map.control.getGMap());
      directionsDisplay.setPanel(document.getElementById('panel'));
      var directionsService = new google.maps.DirectionsService();
      var start = routePoints.start.address;
      var end = routePoints.end.address;
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      };

      var startVenue = routePoints.start.name;
      var endVenue = routePoints.end.name;

      $http
        .get('/api/sports?venue=' + startVenue)
        .success(function(data) {
          console.log(data);
          $scope.startSports = data.sports;
        })

      $http
        .get('/api/sports?venue=' + endVenue)
        .success(function(data) {
          console.log(data);
          $scope.endSports = data.sports;
        })

      directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          $scope.received = true;
          directionsDisplay.setDirections(response);
          console.log(response);
        }
      });
      return;
    };
  });



