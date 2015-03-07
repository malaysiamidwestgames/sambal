'use strict';

describe('Service: yelp', function () {

  // load the service's module
  beforeEach(module('midwestApp'));

  // instantiate service
  var yelp;
  beforeEach(inject(function (_yelp_) {
    yelp = _yelp_;
  }));

  it('should do something', function () {
    expect(!!yelp).toBe(true);
  });

});
