'use strict';

describe('Directive: navigationBar', function () {

  // load the directive's module
  beforeEach(module('hackucscApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<navigation-bar></navigation-bar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the navigationBar directive');
  }));
});
