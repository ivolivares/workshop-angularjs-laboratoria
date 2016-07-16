var app = angular.module("laboratoriaApp", []);

app.controller('studentController', function( $scope ) {
  $scope.student = {
    firstName: 'Homero',
    lastName: 'Simpson',
    fullName: function() {
      var studentObject = $scope.student;
      return studentObject.firstName + " " + studentObject.lastName;
    }
  };
});