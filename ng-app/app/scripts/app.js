'use strict';

/**
 * @ngdoc overview
 * @name midwestApp
 * @description
 * # midwestApp
 *
 * Main module of the application.
 */
angular
  .module('midwestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'sysofwan.httpWrapper',
    'ui.validate'
  ])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login' , {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register' , {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
