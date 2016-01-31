'use strict';

describe('Controller: EditRequestCtrl', function () {

  // load the controller's module
  beforeEach(module('hackucscApp'));

  var EditRequestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditRequestCtrl = $controller('EditRequestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
