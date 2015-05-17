'use strict';

describe('Controller: CheckineventinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var CheckineventinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckineventinfoCtrl = $controller('CheckineventinfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
