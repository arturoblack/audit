var app = angular.module('myApp',
          ['ngRoute', 'ngAnimate','angular-loading-bar','sidebarApp','areasApp',
          'procesosApp'])
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}])
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: "index.html",
      })
    $locationProvider.html5Mode(true);  
}]);