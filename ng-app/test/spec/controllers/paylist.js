'use strict';

describe('Controller: PaylistCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var PaylistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaylistCtrl = $controller('PaylistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
