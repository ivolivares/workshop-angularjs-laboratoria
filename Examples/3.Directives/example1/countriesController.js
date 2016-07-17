var app = angular.module("mainApp", []);

app.controller('countriesController', function( $scope ) {
  $scope.countries = [
    {
      locale:'en-US',
      name:'United States'
    },
    {
      locale:'en-GB',
      name:'United Kingdom'
    },
    {
      locale:'en-FR',
      name:'France'
    }
  ];
});