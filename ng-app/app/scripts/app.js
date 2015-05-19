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
    'uiGmapgoogle-maps',
    'ui.gravatar',
    'ui.bootstrap.datetimepicker'
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
        templateUrl: 'views/a_userlist.html',
        controller: 'AdminUserlistCtrl',
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
      .when('/admin' , {
        templateUrl: 'views/admin.html',
        requireLogin: true,
        requireAdmin: true
      })
      .when('/admin-settings/:userId', {
        templateUrl: 'views/admin_settings.html',
        controller: 'AdminSettingsCtrl'
      })
      .when('/eventmaps', {
        templateUrl: 'views/eventmaps.html',
        controller: 'EventmapsCtrl'
      })
      .when('/livedraw', {
        templateUrl: 'views/livedraw.html',
        controller: 'LivedrawCtrl'
      })
      .when('/sportsreg', {
        templateUrl: 'views/sportsreg.html',
        controller: 'SportsregCtrl',
        requireLogin: true,
        requirePaidGen: false
      })
      .when('/transportation', {
        templateUrl: 'views/transportation.html',
        controller: 'TransportationCtrl',
      })
      .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'TeamsCtrl',
        requireLogin: true
      })
      .when('/consular', {
        templateUrl: 'views/consular.html',
        controller: 'ConsularCtrl'
      })
      .when('/schedule', {
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleCtrl'
      })
      .when('/livescore', {
        templateUrl: 'views/livescore.html',
        controller: 'LivescoreCtrl'
      })
      .when('/points', {
        templateUrl: 'views/points.html',
        controller: 'PointsCtrl'
      })
      .when('/admin/checkin-events', {
        templateUrl: 'views/checkinevent.html',
        controller: 'CheckinEventCtrl',
        requireAdmin: true
      })
      .when('/admin/checkin-events/:id', {
        templateUrl: 'views/checkineventinfo.html',
        controller: 'CheckinEventInfoCtrl'
      })
      .when('/admin/checkin/express/user/:userId', {
        templateUrl: 'views/expresscheckin.html',
        controller: 'ExpresscheckinCtrl',
        requireAdmin: true
      })
      .when('/credits', {
        templateUrl: 'views/credits.html',
        controller: 'CreditsCtrl'
      })
      .when('/checkin', {
        templateUrl: 'views/checkin.html',
        controller: 'CheckinCtrl'
      })
      .when('/msgboard', {
        templateUrl: 'views/msgboard.html',
        controller: 'MsgsCtrl',
        requireLogin: true
      })
      .when('/msgboard/post/:id', {
        templateUrl: 'views/post.html',
        controller: 'PostsCtrl',
        requireLogin: true
      })
      .when('/msgboard/edit/:mode/:id', {
        templateUrl: 'views/editpost.html',
        controller: 'EditPostsCtrl',
        requireLogin: true
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .constant('_', window._)

  .config(/*@ngInject*/function($httpProvider) {
    $httpProvider.interceptors.push( /*@ngInject*/function($browser, $cookieStore, $q, $location) {
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
            $location.path('/');
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
      // Affected users: non-admins who try to type in /userlist to access userlist.
      else if (next.requireAdmin) {
        session.isAdmin().then(function(data) {
          if (!data) {
            $location.path('/');
            event.preventDefault();
          }
        });
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
        });
      }
      $rootScope.bodyClass = next.bodyClass;
    });
  })

  .constant('_', window._)

  .constant('google', window.google)

  .constant('$', window.$)

  .constant('toastr', window.toastr);
