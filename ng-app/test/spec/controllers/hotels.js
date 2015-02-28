'use strict';

describe('Controller: HotelsCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var HotelsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HotelsCtrl = $controller('HotelsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
