'use strict';

describe('Controller: TransportationCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var TransportationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransportationCtrl = $controller('TransportationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
