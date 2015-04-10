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
          {name: 'Colonial Lanes', address:'950 South Industrial Highway, Ann Arbor, MI 48104'},
          /*{name: 'Red Roof Inn North Campus', address: '3621 Plymouth Rd, Ann Arbor, MI 48105'},
          {name: 'Holiday Inn/Fairfield Inn', address: '3285 Boardwalk Dr, Ann Arbor, MI 48108'}*/
        ],
        end: [
          {name: 'CCRB', address: '401 Washtenaw Avenue, Ann Arbor, Michigan, 48109'},
          {name: 'Mitchell Field', address: '1910 Fuller Road, Ann Arbor, MI 48105'},
          {name: 'Coliseum', address: '721 S. Fifth Ave, Ann Arbor, MI 48104'},
          {name: 'Mason Hall', address: '505 South State Street, Ann Arbor, MI 48109'},
          {name: 'Colonial Lanes', address:'950 South Industrial Highway, Ann Arbor, MI 48104'},
          /*{name: 'Red Roof Inn North Campus', address: '3621 Plymouth Rd, Ann Arbor, MI 48105'},
          {name: 'Holiday Inn/Fairfield Inn', address: '3285 Boardwalk Dr, Ann Arbor, MI 48108'}*/
        ]
      },
      marker: {}
    };
    $scope.routePoints = {
      start: {},
      end: {}
    };
    $scope.routePoints.start = $scope.map.routes.start[0];
    $scope.routePoints.end = $scope.map.routes.end[0];

    var directionsDisplay = new google.maps.DirectionsRenderer();
    var geocoder = new google.maps.Geocoder();

    $scope.calcRoute = function (routePoints) {
      directionsDisplay.setMap($scope.map.control.getGMap());
      directionsDisplay.setPanel(document.getElementById('panel'));
      $scope.same = false;
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

      if (startVenue == endVenue){
        $scope.same = true;
        $http
          .get('/api/sports?venue=' + startVenue)
          .success(function(data) {
            console.log(data);
            $scope.startSports = data.sports;
          })

        geocoder.geocode( { "address": routePoints.start.address}, function(results,status) {
          console.log(results);
          if (status == google.maps.GeocoderStatus.OK && results.length > 0 )  {
            $scope.map.control.refresh({latitude: 42.2814, longitude: -83.7483});
            $scope.map.control.getGMap().setCenter(results[0].geometry.location);
            $scope.map.marker.latitude = results[0].geometry.location.lat();
            $scope.map.marker.longitude = results[0].geometry.location.lng();
            $scope.map.zoom = 18;
          }
        });
      }

      else {

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
      }
      return;
    };
  });



