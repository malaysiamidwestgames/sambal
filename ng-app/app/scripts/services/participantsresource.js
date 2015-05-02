'use strict';

/**
 * @ngdoc service
 * @name midwestApp.participantsResource
 * @description
 * # participantsResource
 * Factory in the midwestApp.
 */
angular.module('midwestApp')
  .factory('participantsResource', function (httpWrapper) {

    // Public API here
    return {
      invite: httpWrapper.post('/api/participants/invite'),
      acceptReq: httpWrapper.patch('/api/participants/accept/:userId'),
      declineReq: httpWrapper.patch('/api/participants/decline/:userId'),
      joinReq: httpWrapper.post('/api/participants/join')
    };
  });
