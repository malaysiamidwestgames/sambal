'use strict';

/**
 * @ngdoc service
 * @name midwestApp.checkinEventResource
 * @description
 * # checkinEventResource
 * Factory in the midwestApp.
 */
 angular.module('midwestApp')
 .factory('checkinResource', function (httpWrapper, $q, _, $http) {

  var checkin = function(params) {
    return $http.post('/api/checkin', params).then(function(results) {
      return results.data;
    }, function(error) {
      error.friendlyText = 'Unknown error';
      if (_.has(error.data, 'message')) {
        error.friendlyText = error.data.message;
      } else if (_.has(error.data, 'user')) {
        if (error.data.user[0] === 'can\'t be blank') {
          error.friendlyText = 'Invalid user id';
        } else {
          error.friendlyText = 'User ' + error.data.user[0];
        }
      } else if(_.has(error.data, 'user_id')) {
        if (error.data.user_id[0] === 'has already been taken') {
          error.friendlyText = 'User already checked-in';
        } else {
          error.friendlyText = 'User id' + error.data.user_id[0];
        }
      }
      return $q.reject(error);
    });
  };

  return {
    getEvents: httpWrapper.get('/api/checkin_event/:id'),
    createEvent: httpWrapper.post('/api/checkin_event'),
    deleteEvent: httpWrapper.delete('/api/checkin_event/:id'),
    checkin: checkin,
    deleteCheckin: httpWrapper.delete('/api/checkin/:id')
  };
});
