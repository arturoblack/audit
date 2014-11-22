var app = angular.module('indicadoresApp',
          ['ngRoute','indicadoresApp.Controllers', 
          'indicadoresOperativosApp.Controllers', 
          'indicadoresGestionApp.Controllers'])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/areas/:areaId/indicadores', {
        templateUrl: "indicadores/index.html",
        controller: 'areaIndicadoresController'
      }).when('/areas/:areaId/indicadores_operativos', {
        templateUrl: "indicadores_operativos/index.html",
        controller: 'areaIndicadoresOperativosController'
      }).when('/areas/:areaId/indicadores_gestion', {
        templateUrl: "indicadores_gestion/index.html",
        controller: 'areaIndicadoresGestionController'
      })
    $locationProvider.html5Mode(true);  
}]);
