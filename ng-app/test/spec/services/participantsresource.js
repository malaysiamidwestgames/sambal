'use strict';

describe('Service: participantsResource', function () {

  // load the service's module
  beforeEach(module('midwestApp'));

  // instantiate service
  var participantsResource;
  beforeEach(inject(function (_participantsResource_) {
    participantsResource = _participantsResource_;
  }));

  it('should do something', function () {
    expect(!!participantsResource).toBe(true);
  });

});
