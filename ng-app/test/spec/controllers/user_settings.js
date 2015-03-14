'use strict';

describe('Controller: UserSettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var UserSettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserSettingsCtrl = $controller('UserSettingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
