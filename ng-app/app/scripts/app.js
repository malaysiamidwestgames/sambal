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
        controller: 'MainCtrl',
        bodyClass: 'main-page'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/activation/:token' , {
        templateUrl: 'views/activation.html',
        controller: 'ActivationCtrl'
      })
      .when('/userlist' , {
        templateUrl: 'views/userlist.html',
        controller: 'UserlistCtrl',
        requireLogin: true,
        requireAdmin: true
      })
      .when('/forgot-pass' , {
        templateUrl: 'views/forgotpass.html',
        controller: 'ForgotPassCtrl'
      })
      .when('/pass-reset/:token' , {
        templateUrl: 'views/passreset.html',
        controller: 'PassResetCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        requireLogin: true
      })
      .when('/confirm_email', {
        templateUrl: 'views/confirm_email.html'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        requireLogin: true
      })
      .when('/user-settings', {
        templateUrl: 'views/user_settings.html',
        controller: 'UserSettingsCtrl',
        requireLogin: true
      })
      .when('/promo/auditions', {
        templateUrl: 'views/promos/auditions.html'
      })
      .when('/rules', {
        templateUrl: 'views/info.html',
        controller: 'InfoCtrl',
        requireLogin: false
      })
      .when('/contact-us', {
        templateUrl: 'views/contact-us.html',
        controller: 'ContctUsCtrl'
      })
      .when('/accommodation', {
        templateUrl: 'views/accommodation.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .constant('_', window._)

  .config(/*@ngInject*/function($httpProvider) {
    $httpProvider.interceptors.push( /*@ngInject*/function($browser, $cookieStore, $q) {
      return {
        request: function(config) {
          /* jshint -W106 */
          config.headers.access_token = $browser.cookies().access_token;
          /* jshint +W106 */
          return config;
        },
        responseError: function(response) {
          if (response.status === 403 || response.status === 401) {
            $cookieStore.remove('access_token');
          }
          return $q.reject(response);
        }
      };
    });
  })

  .run(function($rootScope, session, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (next.requireLogin && !session.isLoggedIn()) {
        $location.path('/');
        event.preventDefault();
      }
      else if (next.requireAdmin && !session.isAdmin()) {
        $location.path('/');
        event.preventDefault();
      }
      $rootScope.bodyClass = next.bodyClass;
    });
  });
