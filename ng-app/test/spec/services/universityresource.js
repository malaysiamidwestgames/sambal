'use strict';

describe('Service: universityResource', function () {

  // load the service's module
  beforeEach(module('midwestApp'));

  // instantiate service
  var universityResource;
  beforeEach(inject(function (_universityResource_) {
    universityResource = _universityResource_;
  }));

  it('should do something', function () {
    expect(!!universityResource).toBe(true);
  });

});
