var app = angular.module('areasApp.Controllers',
  ['ngRoute','areaService'])

app.controller('showAreaController',
  ['$scope', '$routeParams', 'AreaService',
  function($scope, $routeParams, AreaService){
  AreaService.get({areaId: $routeParams.areaId}).$promise.then(
    function(data) {
      $scope.area = data.area;
    },function(error){
      
    }
  );
}]);