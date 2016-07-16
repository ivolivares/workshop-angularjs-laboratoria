var mainApp = angular.module("mainApp", []);

mainApp.directive('fotoRandom', function() {
  var directive = {
    restrict: 'AE',
    template: '<img src="">',
    replace: true
  };
  
  directive.scope = {
     size : "=size"
  };
  
  directive.compile = function(element, attributes) {
     var linkFunction = function($scope, element, attributes) {
        var randomString = Math.random().toString(36).substring(7),
            size = (attrs.size) ? attrs.size : 250;
        
        scope.img = 'https://api.adorable.io/avatars/' + size + '/'+ randomString;
     }
     return linkFunction;
  };
  
  return directive;
});
         
mainApp.controller('applicationController', function($scope) {
  $scope.sizes = [500, 300, 200, 100];
});