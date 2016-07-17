// Define a module
var mainApp = angular.module("mainApp", []);

// Create a value object as "defaultInput" and pass it a data.
mainApp.value("defaultInput", 5);

/*
  Create a factory "MathService" which provides a method
  multiply to return multiplication of two numbers.
*/
mainApp.factory('MathService', function() {
  var labFactory = {};

  labFactory.division = function(a) {
    return (a / 2);
  };

  labFactory.multiply = function( a, b ) {
    return a * b
  }
  return labFactory;
}); 

/*
  Inject the factory "MathService" in a service to utilize
  the multiply method of factory.
*/
mainApp.service('CalcService', function( MathService ) {
   this.square = function( a ) {
      return MathService.multiply( a, a );
   };
   this.division = function( a ) {
    return MathService.division(a);
   };
});

// Inject the service "CalcService" into the controller.
mainApp.controller('CalcController', function( $scope, CalcService, defaultInput ) {
  $scope.number = defaultInput;
  $scope.result = {
    multiply: CalcService.square($scope.number),
    division: CalcService.division($scope.number)
  };
   
   $scope.square = function() {
    $scope.result.multiply = CalcService.square($scope.number);
   };

   $scope.division = function() {
    $scope.result.division = CalcService.division($scope.number);
   };
});