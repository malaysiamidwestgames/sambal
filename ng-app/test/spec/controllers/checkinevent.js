'use strict';

describe('Controller: CheckineventCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var CheckineventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckineventCtrl = $controller('CheckineventCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
