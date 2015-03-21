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

    var isAdmin = function() {
      if ($rootScope.currentUser === undefined) {
        return false;
      }
      return $rootScope.currentUser.authorization_level === 'admin';
    };

    var revokeAccess = function(resp) {
      if (resp.status === 401) {
        $cookieStore.remove('access_token');
      }
    };

    var init = function() {
      if (isLoggedIn()) {
        getCurrentUser().then(function(user) {
          $rootScope.currentUser = user.user;
          service.fire({type: 'userAvailable', user: user.user});
        }, revokeAccess);
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

    service.getUser = function() {
      return $q(function(resolve, reject) {
        if ($rootScope.currentUser) {
          resolve($rootScope.currentUser);
        } else {
          getCurrentUser().then(function(user) {
            resolve(user.user);
          }, function() {
            reject();
            revokeAccess();
          });
        }
      });
    };

    service.isAdmin = isAdmin;
    service.isLoggedIn = isLoggedIn;
    service.getAccessToken = getAccessToken;

    init();

    return service;
  });
