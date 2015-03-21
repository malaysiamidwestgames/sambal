'use strict';

/**
 * @ngdoc service
 * @name midwestApp.yelp
 * @description
 * # yelp
 * Service in the midwestApp.
 */
function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
}

angular.module('midwestApp')
  .factory('yelp', function ($http) {
    return {
    "searchYelp": function(name, callback) {
      var method = 'GET';
      var url = ' http://api.yelp.com/v2/search';
      var params = {
        callback: 'angular.callbacks._0',
        location: 'Ann+Arbor',
        oauth_consumer_key: '7ByiNo9cOsiD7AwhH_harQ',
        oauth_token: 'acH_orHKZx1651FvofqGHV5lTTuGvjaF',
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: new Date().getTime(),
        oauth_nonce:randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        term: name
      };
      var consumerSecret = 'ZkTzSZUQD_cShJHjRlLOqGJrnfs';
      var tokenSecret = 'kD1sWz8mwTmbGIaKcJ4zMkcp3Ks';
      var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {encodeSignature: false});
      params['oauth_signature'] = signature;
      $http.jsonp(url, {params: params}).success(callback);
      }
    };
  });
