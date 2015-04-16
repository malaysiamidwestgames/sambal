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
        bodyClass: 'main-page',
        requireLogout: true
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
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        requireLogin: true
      })
      .when('/payment/done', {
        templateUrl: 'views/payment_done.html',
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
        templateUrl: 'views/auditions.html'
      })
      .when('/rules', {
        templateUrl: 'views/pdfmodal.html',
        controller: 'PdfmodalCtrl'
      })
      .when('/contact-us', {
        templateUrl: 'views/contact-us.html',
        controller: 'ContctUsCtrl'
      })
      .when('/accommodation', {
        templateUrl: 'views/accommodation.html'
      })
      .when('/eventmaps', {
        templateUrl: 'views/eventmaps.html',
        controller: 'EventmapsCtrl'
      })
      .when('/sportsreg', {
        templateUrl: 'views/sportsreg.html',
        controller: 'SportsregCtrl',
        requireLogin: true,
        requirePaidGen: true,
        requireAdmin: true
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
      // TODO: bug here. Race event between asynchronous call of isAdmin and loading the page causing users to get disconnected
      else if (next.requireAdmin) {
        session.isAdmin().then(function(data) {
          if (!data) {
            $location.path('/');
            event.preventDefault();
          }
        })
      }
      else if (next.requireLogout && session.isLoggedIn()) {
        $location.path('/dashboard/');
        event.preventDefault();
      }
      else if (next.requirePaidGen) {
        session.hasPaidGen().then(function(data) {
          if (!data) {
            $location.path('/');
            event.preventDefault();
          }
        })
      }
      $rootScope.bodyClass = next.bodyClass;
    });
  });
