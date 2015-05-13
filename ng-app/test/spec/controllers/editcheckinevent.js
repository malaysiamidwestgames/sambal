'use strict';

describe('Controller: EditcheckineventCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var EditcheckineventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditcheckineventCtrl = $controller('EditcheckineventCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
