var mainApp = angular.module("mainApp", []);

mainApp.directive('laboratoria', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: '<h1>Esto es Laboratoria!!</h1>'
  };
});

mainApp.directive('laboratoriaAngular', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: '<h1>Esto es AngularJS en Laboratoria!!</h1>'
  };
});