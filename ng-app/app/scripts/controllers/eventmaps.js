'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:EventmapsCtrl
 * @description
 * # EventmapsCtrl
 * Controller of the midwestApp
 */



angular.module('midwestApp')
  .controller('EventmapsCtrl', function ($scope, yelp) {
    $scope.map = {
      center: { latitude: 42.2814, longitude : -83.7483},
      zoom: 12,
      control: {},
      routes: {
        start: [
          {name: 'Central Campus Recreation Building', address: '401 Washtenaw Avenue, Ann Arbor, Michigan 48109'},
          {name: 'Mitchell Field', address: '1910 Fuller Road, Ann Arbor, MI 48105'},
          {name: 'Sports Coliseum', address: '721 S. Fifth Ave, Ann Arbor, MI 48104 '}
        ],
        end: [
          {name: 'Central Campus Recreation Building', address: '401 Washtenaw Avenue, Ann Arbor, Michigan, 48109'},
          {name: 'Mitchell Field', address: '1910 Fuller Road, Ann Arbor, MI 48105'},
          {name: 'Sports Coliseum', address: '721 S. Fifth Ave, Ann Arbor, MI 48104'}
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

      directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          console.log(response);
        }
      });
      return;
    };

    $scope.yelpSearchTerm = function () {
      $scope.yelpTerm = $scope.searchTerm.split(' ').join('+');
    };

    $scope.yelpSearch = function (yelpTerm) {
      yelp.searchYelp(yelpTerm, function(data,error) {
        console.log(data);
        console.log(error);
        $scope.businesses = data.businesses;
      });
    };

  });
