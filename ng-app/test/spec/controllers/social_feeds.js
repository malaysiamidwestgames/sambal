'use strict';

describe('Controller: SocialFeedsCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var SocialFeedsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SocialFeedsCtrl = $controller('SocialFeedsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
