'use strict';
// Definimos los callback
var config = function( $routeProvider, $locationProvider ) { // Se añaden las dependencias como parámetros
  $routeProvider
  .when('/Home', { // "Cuando" (when) la ruta sea /Home, definimos:
    templateUrl : './templates/home.html', // Template para cargar en ng-view
    controller : 'HomeController', // Controlador para asociar el template
    controllerAs : 'home' // Alias para llamar al template, esto es una buena práctica
  })
  .when('/Socials', {
    templateUrl : './templates/socials.html',
    controller : 'SocialController',
    controllerAs : 'social'
  })
  .when('/Github', {
    templateUrl : './templates/github.html',
    controller : 'GithubController',
    controllerAs : 'github'
  })
  // En caso contrario a todos los anteriores (else/otherwise),
  // redireccionamos a /Home ; O sea, si ingreso /LoQueSea se irá a /Home
  .otherwise({
    redirectTo : '/Home'
  });
},
// Definimos el controller para la aplicación general "MainController"
mainController = function() { // Asignamos a una variable la función que crea el controller

  // this : es el equivalente a $scope ; pero como buena práctica utilizamos this.
  this.meta = {
    title: 'Iván  Mi Portafolio',
    description: 'Este es mi portafolio bla bla abla bla ....'
  };

  this.titulo = 'Iván ';
},
// Definimos un controlador para "HomeController", idem a lo anterior.
homeController = function() {
  this.bienvenida = 'Bienvenido!';
},
// Definimos el "requestService", utilizado como factory para solicitar datos vía $http.
requestService = function( $http, resourceURL ) { // Se añaden las dependencias como parámetros
  return {
    get: function() { // .get() será una función que retornará el requestService
      return $http({ // $http es una función para requests AJAX en AngularJS
        method: 'GET', // Método de la petición
        url: resourceURL // Asociamos esta URL a la dependencia, creada como "value" dependency
      })
      // Cuando la promesa devuelta un "ok", asociamos esta función
      .then(function successCallback(response) { // response tiene el contenido del request
        return response.data; // response.data para obtener los datos que vinieron en la petición
      },
      // Cuando la promesa devuelve un "error", asociamos esta función.
      // Un error puede ser un "404 Not found" si el recurso no existe, entre otros.
      // Ver más de tipos de errores en: https://es.wikipedia.org/wiki/Anexo:Códigos_de_estado_HTTP
      function errorCallback(response) { // response tiene la respuesta del contenido del error
        // Mostramos el error por consola. Por ahora, es todo el manejo de error.
        // Esto podría ser el lugar para entregar el mensaje y
        // en la llamada a la función obtenerla para mostrar un mensaje de error al usuario.
        console.error(response);
      });
    }
  }
},
// Definimos un controlador para "SocialController",
// idem a los controladores anteriores.
socialController = function() {
  // Creamos un array de objetos que contienen nuestra lista de redes sociales.
  // [EXTRA] Podrías añadir un icono. Revisar: ng-src para la etiqueta <img />
  // https://docs.angularjs.org/api/ng/directive/ngSrc
  this.redes = [
    {
      'url': 'https://facebook.com/ivolivares.cl',
      'nombre' : 'Facebook'
    },
    {
      'url': 'https://twitter.com/ivolivares',
      'nombre' : 'Twitter'
    },
    {
      'url': 'https://linkedin.com/in/ivolivares',
      'nombre' : 'LinkedIn'
    }
  ];
},
// Definimos un controlador para "GithubController",
// idem a lo anterior, pero esta vez con una dependencia.
githubController = function( requestService ) { // Se añaden las dependencias como parámetros
  // "self" se utiliza como variable (no es palabra reservada),
  // y tendrá el contenido de "this", la utilizamos para no perder el contexto.
  var self = this;

  // Llamamos a la función .get() del requestService,
  // retorna una promesa que utilizamos con .then() donde le entregamos
  // el "success callback" y "error callback".
  // Por ahora solo utilizamos el primero.
  requestService.get().then(function( dataGithub ) { // dataGithub es la respuesta del servicio (response.data línea 51)

    self.repos = []; // definimos el array repos

     // Para dataGithub hacemos un forEach para recorrer los datos.
    dataGithub.forEach(function( repo ) { // asociamos cada elemento a la variable "repo"

      // En cada iteración añadimos un objeto a .repos[]
      self.repos.push({
        url: repo.html_url, // Como URL utilizamos el valor de repo.html_url obtenido de la API
        nombre: repo.name // Como nombre utilizamos el valor de repo.name obtenido de la API
      });

    });

  });

},
// Definimos un controlador para "NavigationController",
// idem a lo anterior volvemos a utilizar una dependencia.
navController = function( $location ) { // Se añaden las dependencias como parámetros
  // Creamos un array de objetos que contiene el menú.
  this.menuApp = [
    {
      url: 'Home',
      nombre: 'Inicio'
    },
    {
      url: 'Socials',
      nombre: 'Contacto'
    },
    {
      url: 'Github',
      nombre: 'Trabajo'
    }
  ];

  // La función setClass es utilizada para conocer la página actual
  // y en base a ésta, entregar una clase 'active' cuando la página vista
  // actualmente es la misma a la página del elemento que pide la función.
  // O sea, page === currentRoute
  this.setClass = function ( page ) { // Obtenemos page desde la vista. Ver línea 24 de index.html
    // Creamos la variable que utiliza el path de la ubicación (url tipo: /Home )
    // con .substring(1) quitamos el primer caracter (slash: / )
    // Si no está definido el location, por defecto será 'Home' (or : || )
    var currentRoute = $location.path().substring(1) || 'Home'; 
    
    // Ternary, es una forma diferente escribir un if
    // Su formato es: (condición ? verdadero : falso)
    // Más inforamción: https://es.wikipedia.org/wiki/Lógica_trivalente
    return page === currentRoute ? 'active' : '';
  };
};

// Iniciamos la aplicación, definiendo el nombre y sus dependencias.
angular.module('labPortfolio', ['ngRoute'])

// Pasamos las dependencias y la función tipo "callback"
.config(['$routeProvider', '$locationProvider', config])

// Definimos el endpoint/resource para el recurso a consumir
.value('resourceURL', 'https://api.github.com/users/ivolivares/repos')

// Creamos el factory para las peticiones mediante $http,
// le entregamos la función tipo "callback"
.factory('requestService', requestService)

// Creamos los controladores necesarios para la aplicación,
// entregando la función como tipo "callback"
.controller('MainController', mainController)
.controller('HomeController', homeController)
.controller('SocialController', socialController)
.controller('GithubController', githubController)

// En este controlador tenemos una dependencia: $location,
// por lo que el segundo parámetro lo creamos en un array de dependencias.
.controller('NavigationController', ['$location', navController]);


/*
  Tips:

  1. En JavaScript podemos escribir el código con un "ENTER" entre líneas.
    Esto no afecta al código, se utiliza para no escribir sólo una línea y dar
    continuidad al código.
    En Angular esto se vé mejor utilizado entre las líneas 151 a la 174.

  2. Las variables pueden ser declaradas por comma (,)
    La práctica es común en ECMA Script 5. Su forma de escribila es:

    var nombreVariable = 'este es un string',
        numeroVariable = 1000;

    Que es lo mismo que escribir:

    var nombreVariable 'este es un string';
    var numeroVariable = 1000;

    Esto lo vemos desde la línea 3 a la línea 149.
*/