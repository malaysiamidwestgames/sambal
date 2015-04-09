'use strict';

describe('Controller: EventmapsCtrl', function () {

  // load the controller's module
  beforeEach(module('midwestApp'));

  var EventmapsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventmapsCtrl = $controller('EventmapsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
