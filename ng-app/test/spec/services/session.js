'use strict';

describe('Service: session', function () {

  // load the service's module
  beforeEach(module('midwestApp'));

  // instantiate service
  var session;
  beforeEach(inject(function (_session_) {
    session = _session_;
  }));

  it('should do something', function () {
    expect(!!session).toBe(true);
  });

});
