'use strict';

describe('Controller: SuvaiCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var SuvaiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuvaiCtrl = $controller('SuvaiCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
