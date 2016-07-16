var app = angular.module("mainApp", []);

app.controller('studentController', function($scope) {
   $scope.student = {
      firstName: "Bart",
      lastName: "Simpson",
      fees: 500,
      subjects:[
         {
            name: 'Physics',
            marks: 70
         },
         {
            name: 'Chemistry',
            marks: 80
         },
         {
            name: 'Math',
            marks: 65
         }
      ],
      fullName: function() {
         var studentObject = $scope.student;
         return studentObject.firstName + " " + studentObject.lastName;
      }
   };
});