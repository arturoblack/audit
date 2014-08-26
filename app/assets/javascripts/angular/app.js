var app = angular.module('myApp',
          ['ngRoute','sidebarApp','areasApp'])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: "index.html",
      })
    $locationProvider.html5Mode(true);  
}]);