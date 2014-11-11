var app = angular.module('sidebarApp.Controllers',
  ['dirAutocomplete','templates','ngRoute','areaService'])

app.controller('sidebarController',
  ['$scope', function($scope){
}]);

app.controller('sidebarSearchController',
  ['$scope', '$location', 'currentAreaService',
  function($scope,$location,currentAreaService){
  $scope.autocomplete_config = {
    serviceUrl: '/api/search/areas',
    minChars: 3,
    dataType: 'json',
    deferRequestBy: 100,
  }  
  $scope.onSelect = function(id){
    $scope.$apply(function () {
      currentAreaService.resetArea();
      $location.path("/areas/" + id);
    });
  }
}]);
