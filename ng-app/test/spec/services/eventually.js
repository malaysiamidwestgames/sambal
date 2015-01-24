'use strict';

describe('Service: eventually', function () {

  // load the service's module
  beforeEach(module('midwestApp'));

  // instantiate service
  var eventually;
  beforeEach(inject(function (_eventually_) {
    eventually = _eventually_;
  }));

  it('should do something', function () {
    expect(!!eventually).toBe(true);
  });

});
