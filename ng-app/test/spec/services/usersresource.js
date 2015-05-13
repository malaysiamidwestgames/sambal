'use strict';

describe('Service: usersResource', function () {

  // load the service's module
  beforeEach(module('midwestApp'));

  // instantiate service
  var usersResource;
  beforeEach(inject(function (_usersResource_) {
    usersResource = _usersResource_;
  }));

  it('should do something', function () {
    expect(!!usersResource).toBe(true);
  });

});
