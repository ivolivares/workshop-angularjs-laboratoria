var mainApp = angular.module("mainApp", []);

mainApp.controller('studentController', function( $scope ) {
  $scope.student = {
    firstName: 'Homero',
    lastName: 'Simpson',
    fullName: function() {
      var studentObject = $scope.student;
      return studentObject.firstName + " " + studentObject.lastName;
    }
  };
});