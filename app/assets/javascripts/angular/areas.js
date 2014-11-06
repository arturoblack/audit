var app = angular.module('areasApp',
          ['ngRoute','areasApp.Controllers'])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/areas',{
        templateUrl: 'areas/index.html',
        controller: 'indexAreaController'
      }).when('/areas/:areaId', {
        templateUrl: "areas/show.html",
        controller: 'showAreaController'
      }).when('/areas/:areaId/procesos', {
        templateUrl: "procesos/index.html",
        controller: 'areaProcesosController'
      })
    $locationProvider.html5Mode(true);  
}]);
