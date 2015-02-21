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
    'ui.bootstrap',
    'ui.validate',
    'uiGmapgoogle-maps'
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
        controller: 'AboutCtrl',
        requireLogin: true // testing restricted access
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/social_feeds', {
        templateUrl: 'views/social_feeds.html',
        controller: 'SocialFeedsCtrl'
      })
      .when('/userlist' , {
        templateUrl: 'views/userlist.html',
        controller: 'UserlistCtrl'
      })
       .when('/accommodations' , {
        templateUrl: 'views/accommodations.html'
        //controller: 'UserlistCtrl'
        })
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl'
      })
      .when('/paylist', {
        templateUrl: 'views/paylist.html',
        controller: 'PaylistCtrl'
      })
      .when('/eventmaps', {
        templateUrl: 'views/eventmaps.html',
        controller: 'EventmapsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })

  .constant('_', window._)

  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($browser) {
      return {
        request: function(config) {
          /* jshint -W106 */
          config.headers.access_token = $browser.cookies().access_token;
          /* jshint +W106 */
          return config;
        }
      };
    });
  })

  .run(function($rootScope, session, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (next.requireLogin && !session.isLoggedIn()) {
        $location.path('/login');
        event.preventDefault();
      }

    });
  });
