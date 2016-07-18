'use strict';
var app = angular.module("mainApp", ['ngAnimate']);

app.value("resourceURL", "./resources/students.json");

app.factory('requestService', function( $http, resourceURL ) {
  /*
    Since $http.get returns a promise,
    and promise.then() also returns a promise
    that resolves to whatever value is returned in it's 
    callback argument, we can return that.
  */
  return {
    get: function() {
      return $http({
        method: 'GET',
        url: resourceURL
      }).then(function successCallback(response) {
        /*
          This callback will be called asynchronously
          when the response is available.
        */
        return response.data;
      }, function errorCallback(response) {
        /*
          Called asynchronously if an error occurs
          or server returns response with an error status.
        */
        console.error(response);
      });
    }
  }
});

app.value("simpsonsWikia", "http://simpsons.wikia.com/wiki/");

app.controller('universityController', function(
  $scope,
  $timeout,
  requestService,
  simpsonsWikia
) {
  $scope.loaded = false;

  requestService.get().then(function( data ) {
    // This will execute when the AJAX call completes.

    $scope.students = [];

    data.students.forEach(function( studentName ) {
      $scope.students.push({
        url : simpsonsWikia + studentName.replace(" ", '_'),
        name : studentName
      });
    });

    // Use the $timeout function to emulate a delay in request.
    var stopLoading = function() {
      $scope.loaded = true;
    };

    $timeout(stopLoading, 3000);
 });
});