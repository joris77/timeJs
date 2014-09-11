'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('mean101App'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {

  }));

  it('bla', function () {
      expect(1).toBe(1);
  });
});
