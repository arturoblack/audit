var app = angular.module('myApp',
          ['ngRoute', 'ngAnimate','angular-loading-bar','sidebarApp',
          'oestrategicosApp', 'areasApp','titleService','procesosApp', 
          'indicadoresApp', 'auditoriasApp']);

app.run(['$rootScope','titleService',
  function($rootScope,titleService){
  $rootScope.$on("$routeChangeSuccess", function(event, currentRoute){
    if(currentRoute.$$route.title){
      titleService.setTitle(currentRoute.$$route.title);
    }
  });
}]);

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: "index.html",
        title: 'Home'
      }).when('/404', {
        templateUrl : '404.html',
        title: '404'
      });
    $locationProvider.html5Mode(true);  
}]);

app.config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

app.factory('httpRequestInterceptor',['$q', '$location','messagesService',
  function ($q, $location,messagesService) {
    return {
      'responseError': function(rejection) {
        // do something on error
        if(rejection.status === 404){
          $location.path("/404/");
        }else if(rejection.status === 401){
          $location.path("/");
          messagesService.show_message('error', 'Unauthorized');
        }
        return $q.reject(rejection);
       }
     };
}]);
