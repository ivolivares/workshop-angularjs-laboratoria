// Define a module
var mainApp = angular.module("mainApp", []);

/* 
  Create a service using provider which defines a method
  square to return square of a number.
*/
mainApp.config(function( $provide ) {
  $provide.provider('MathService', function() {
    this.$get = function() {
      var factory = {};  

      factory.multiply = function( a, b ) {
        return a * b; 
      }
      return factory;
    };
  });
});

// Create a value object as "defaultInput" and pass it a data.
mainApp.value("defaultInput", 5);

/*
  Create a factory "MathService" which provides a method
  multiply to return multiplication of two numbers.
*/
mainApp.factory('MathService', function() {
  var factory = {};

  factory.multiply = function( a, b ) {
    return a * b
  }
  return factory;
}); 

/*
  Inject the factory "MathService" in a service to utilize
  the multiply method of factory.
*/
mainApp.service('CalcService', function( MathService ) {
   this.square = function(a) {
      return MathService.multiply( a,a );
   }
});

// Inject the service "CalcService" into the controller.
mainApp.controller('CalcController', function( $scope, CalcService, defaultInput ) {
   $scope.number = defaultInput;
   $scope.result = CalcService.square($scope.number);
   
   $scope.square = function() {
      $scope.result = CalcService.square($scope.number);
   }
});