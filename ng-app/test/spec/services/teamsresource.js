'use strict';

describe('Service: teamsResource', function () {

  // load the service's module
  beforeEach(module('midwestApp'));

  // instantiate service
  var teamsResource;
  beforeEach(inject(function (_teamsResource_) {
    teamsResource = _teamsResource_;
  }));

  it('should do something', function () {
    expect(!!teamsResource).toBe(true);
  });

});
