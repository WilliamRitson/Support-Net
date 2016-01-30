'use strict';

describe('Controller: RequestListCtrl', function () {

  // load the controller's module
  beforeEach(module('hackucscApp'));

  var RequestListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestListCtrl = $controller('RequestListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
