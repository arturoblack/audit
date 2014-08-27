var app = angular.module('areasApp.Controllers',
  ['ngRoute','areaService'])

app.controller('showAreaController',
  ['$scope', '$routeParams', 'AreaService', 'currentAreaService',
  function($scope, $routeParams, AreaService, currentAreaService){
  $scope.loading_area = true;  
  AreaService.get({areaId: $routeParams.areaId}).$promise.then(
    function(data) {
      $scope.area = data.area;
      currentAreaService.setArea(data.area.id,data.area.nombre)
      $scope.loading_area = false; 
    },function(error){
      
    }
  );
}]);
app.controller('sidebarAreaController',
  ['$scope', '$routeParams', 'AreaService', 'currentAreaService',
  function($scope, $routeParams, AreaService, currentAreaService){
  $scope.$on('refreshedArea', function() {
    $scope.area = currentAreaService;
  });
}]);