var app = angular.module('auditoriasApp',
          ['ngRoute','auditoriasApp.Controllers'])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/areas/:areaId/auditorias', {
        templateUrl: "auditorias/index.html",
        controller: 'areaAuditoriasController'
      })
    $locationProvider.html5Mode(true);  
}]);