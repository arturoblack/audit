var app = angular.module('oestrategicosApp',
          ['ngRoute','oestrategicosApp.Controllers'])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
    .when('/oestrategicos', {
        templateUrl: "oestrategicos/index.html",
        controller: 'indexOestrategicosController'
    })
    $locationProvider.html5Mode(true);  
}]);
