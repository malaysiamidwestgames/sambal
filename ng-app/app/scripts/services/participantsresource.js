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
      acceptReq: httpWrapper.patch('/api/participants/accept/:id'),
      declineReq: httpWrapper.patch('/api/participants/decline/:id'),
      rejectReq: httpWrapper.patch('/api/participants/reject/:id'),
      removeReq: httpWrapper.delete('/api/participants/remove/:id'),
      joinReq: httpWrapper.post('/api/participants/join')
    };
  });
