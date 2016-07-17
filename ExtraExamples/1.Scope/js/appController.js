angular.module('mainApp').controller('appController', function( $scope, $sce ) {
  $scope.page = {
    meta : {
      title: 'Scope in AngularJS'
    },
    headings : {
      title: 'Understanding <code>$scope</code> in AngularJS'
    }
  };

  /*
    Using: sce (Strict Contextual Escaping).
    ¿You need use HTML into variable string to scope?
    To do this you need to use $sce angularjs built-in service to secure the HTML content before parsing.

    DOC: https://docs.angularjs.org/api/ng/service/$sce#show-me-an-example-using-sce-
  */
  $scope.toTrustedHTML = function ( html ) {
    return $sce.trustAsHtml(html);
  };

});