var app = angular.module('areasApp.Controllers',
  ['ngRoute','areaService'])
app.controller('showAreaController',
  ['$scope', '$routeParams', '$location', 'AreaService', 'currentAreaService',
  function($scope, $routeParams, $location, AreaService, currentAreaService){
  $scope.loading_area = true;  
  AreaService.get({areaId: $routeParams.areaId}).$promise.then(
    function(data) {
      $scope.area = data.area;
      currentAreaService.setArea(data.area.id,data.area.nombre)
      $scope.loading_area = false; 
    },function(error){
      $scope.loading_area = false;      
      $location.path("/");
    }
  );
}]);

app.controller('areaProcesosController',
  ['$scope', '$location', 'AreaService', 'currentAreaService', '$routeParams',
  function($scope, $location, AreaService, currentAreaService, $routeParams){
  $scope.loading_area = true;  
  AreaService.procesos({ areaId: $routeParams.areaId}).$promise.then(
    function(data) {
      $scope.area = data.area;
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.procesos = data.procesos;
      $scope.loading_area = false; 
    },function(error){
      $location.path("/");      
      $scope.loading_area = false;
    }
  );
}]);

app.controller('sidebarAreaController',
  ['$scope','$route', '$location', 'AreaService', 'currentAreaService',
  function($scope, $route, $location, AreaService, currentAreaService){
  $scope.$on('refreshedArea', function() {
    $scope.area = currentAreaService;
  });
  //for changing the li>active based on the route location
  $scope.$on('$routeChangeSuccess', function(next, current) {
    if($location.path().match(/procesos/)){
      $scope.active_link = 1;
    }else if($location.path().match(/auditorias/)){
      $scope.active_link = 2;
    }else{
      $scope.active_link = 0;
    }
  });
}]);
