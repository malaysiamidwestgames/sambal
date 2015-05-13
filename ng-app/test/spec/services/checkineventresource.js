'use strict';

describe('Service: checkinEventResource', function () {

  // load the service's module
  beforeEach(module('midwestApp'));

  // instantiate service
  var checkinEventResource;
  beforeEach(inject(function (_checkinEventResource_) {
    checkinEventResource = _checkinEventResource_;
  }));

  it('should do something', function () {
    expect(!!checkinEventResource).toBe(true);
  });

});
