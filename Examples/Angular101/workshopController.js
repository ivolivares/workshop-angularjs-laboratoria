var app = angular.module('angular101', []);

app.controller('workshopController', function( $scope ){
  $scope.page = {
    title: 'Angular 101',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\
    Nostrum quis doloremque quibusdam magnam praesentium id inventore fuga \
    numquam voluptate quasi voluptates minima, repellat qui temporibus nesciunt \
    accusamus eos voluptas molestiae.'
  };
});