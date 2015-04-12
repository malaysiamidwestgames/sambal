'use strict';

describe('Controller: LogodesignCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var LogodesignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogodesignCtrl = $controller('LogodesignCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
