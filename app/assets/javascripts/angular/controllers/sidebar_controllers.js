var app = angular.module('sidebarApp.Controllers',
  ['dirAutocomplete','templates','ngRoute'])

app.controller('sidebarController',
  ['$scope', function($scope){
}]);
app.controller('sidebarSearchController',
  ['$scope', '$location', function($scope,$location){
  $scope.autocomplete_config = {
    serviceUrl: '/api/search/areas',
    minChars: 3,
    dataType: 'json',
    deferRequestBy: 100,
  }  
  $scope.onSelect = function(id){
    $scope.$apply(function () {
      $location.path("/areas/" + id);
    });
  }
}]);