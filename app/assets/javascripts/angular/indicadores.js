var app = angular.module('indicadoresApp',
          ['ngRoute','indicadoresApp.Controllers'])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/areas/:areaId/indicadores', {
        templateUrl: "indicadores/index.html",
        controller: 'areaIndicadoresController'
      })
    $locationProvider.html5Mode(true);  
}]);
