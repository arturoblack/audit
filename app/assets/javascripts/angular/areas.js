var app = angular.module('areasApp',
          ['ngRoute','areasApp.Controllers'])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/areas/:areaId', {
        templateUrl: "areas/show.html",
        controller: 'showAreaController',
        title: 'Nombre del area'
      })
    $locationProvider.html5Mode(true);  
}]);