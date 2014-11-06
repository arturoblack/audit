var app = angular.module('oestrategicosApp.Controllers',
  ['ngRoute', 'ui.bootstrap', 'messagesService','titleService'])

app.controller('indexOestrategicosController',
  ['$scope', '$routeParams', '$location', 'titleService',
  function($scope, $routeParams, $location, titleService){
  $scope.hola = 'chauuuuuuuuuuuuuuuuuuuuuuuuuuuu';  
}]);


