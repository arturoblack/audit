var app = angular.module('sidebarApp.Controllers',
  ['dirAutocomplete','templates'])
app.controller('sidebarController',
  ['$scope', function($scope){  
  $scope.hola = 'chau'  
}]);
app.controller('sidebarSearchController',
  ['$scope', function($scope){
  $scope.autocomplete_config = {
    serviceUrl: '/api/search/areas',
    minChars: 3,
    dataType: 'json'
  }  
  $scope.onSelect = function(id){
    console.log(id)
  }
}]);