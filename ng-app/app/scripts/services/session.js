'use strict';

angular.module('midwestApp')
  .factory('session', function (httpWrapper, eventually, $rootScope, $cookieStore, $q, $browser) {
    var createSession = httpWrapper.post('/api/sessions');
    var destroySession = httpWrapper.delete('/api/sessions');
    var getCurrentUser = httpWrapper.get('/api/users/me');
    var service = eventually({});

    var getAccessToken = function() {
      /* jshint -W106 */
      return $browser.cookies().access_token;
      /* jshint +W106*/
    };

    var isLoggedIn = function() {
      return getAccessToken() ? true : false;
    };

    var init = function() {
      if (isLoggedIn()) {
        getCurrentUser().then(function(user) {
          $rootScope.currentUser = user;
          service.fire({type: 'userAvailable', user: user});
        }, function(resp) {
          if (resp.status === 401) {
            $cookieStore.remove('access_token');
          }
        });
      }
    };

    $rootScope.$watch('currentUser', function() {
      var currentUser = $rootScope.currentUser;
      if (currentUser) {
        service.fire({type: 'userRetrieved', user: currentUser});
      }
      service.fire('userRemoved');
    });

    service.login = function(email, password) {
      return createSession({email: email, password: password})
        .then(function(user){
          service.fire({type: 'userLoggedIn', user:user});
          $rootScope.currentUser = user;
        });
    };

    service.logout = function() {
      if (isLoggedIn()) {
        return destroySession()
          .then(function() {
            service.fire({type: 'userLoggedOut'});
            $rootScope.currentUser = null;
          });
      }
      return $q(function(resolve, reject) {
        reject({message: 'User not logged in'});
      });
    };

    service.isLoggedIn = isLoggedIn;
    service.getAccessToken = getAccessToken;

    init();

    return service;
  });
