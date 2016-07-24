'use strict';
var callbackConfig = function( $routeProvider, $locationProvider ) {
  $routeProvider
  .when('/Book/:bookId', {
    templateUrl: './views/book.html',
    controller: 'BookController',
    controllerAs: 'book'
  })
  .when('/Book/:bookId/chapter/:chapterId', {
    templateUrl: './views/chapter.html',
    controller: 'ChapterController',
    controllerAs: 'chapter'
  })
  .otherwise({
    redirectTo: '/'
  });
},
mainController = function( $route, $routeParams, $location ) {
  this.$route = $route;
  this.$location = $location;
  this.$routeParams = $routeParams;
},
bookController = function( $routeParams ) {
  this.name = "BookController";
  this.params = $routeParams;
},
chapterController = function( $routeParams ) {
  this.name = "ChapterController";
  this.params = $routeParams;
};

angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
.config(['$routeProvider', '$locationProvider', callbackConfig])
.controller('MainController', ['$route', '$routeParams', '$location', mainController])
.controller('BookCtrl', ['$routeParams', bookController])
.controller('ChapterCtrl', ['$routeParams', chapterController]);