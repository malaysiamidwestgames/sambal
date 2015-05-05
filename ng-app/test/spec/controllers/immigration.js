'use strict';

describe('Controller: ImmigrationCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var ImmigrationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImmigrationCtrl = $controller('ImmigrationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
