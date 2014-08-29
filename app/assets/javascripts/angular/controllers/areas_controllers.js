var app = angular.module('areasApp.Controllers',
  ['ngRoute','areaService','messagesService'])

app.controller('showAreaController',
  ['$scope', '$routeParams', '$location', 'AreaService', 'currentAreaService',
  function($scope, $routeParams, $location, AreaService, currentAreaService){
  $scope.loading_area = true;  
  AreaService.get({areaId: $routeParams.areaId}).$promise.then(
    function(data) {
      $scope.area = data.area;
      currentAreaService.setArea(data.area.id,data.area.nombre)
      $scope.loading_area = false; 
  });
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

app.controller('areaProcesosController',
  ['$scope', 'AreaService', 'currentAreaService', '$routeParams',
  function($scope, AreaService, currentAreaService, $routeParams){
  $scope.state = 'procesos'  
  $scope.loading_area = true;  
  AreaService.procesos({ areaId: $routeParams.areaId}).$promise.then(
    function(data) {
      $scope.area = data.area;
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.procesos = data.procesos;
      $scope.loading_area = false; 
  });
  $scope.nuevoProceso = function(){
    $scope.state = 'procesos.new' 
  }
  $scope.listarProcesos = function(){
    $scope.state = 'procesos' 
  }
}]);

app.controller('newProcesoController',
  ['$scope', '$routeParams', '$route', 'AreaService','messagesService',
   function($scope, $routeParams, $route, AreaService, messagesService){
    $scope.nuevo_proceso = {nombre: ''}
    $scope.loading = false;
    $scope.crearProceso = function(){
      $scope.loading = true;
      AreaService.new_proceso({ areaId: $routeParams.areaId, proceso: $scope.nuevo_proceso}).
      $promise.then(
        function(data) {
          $route.reload();
          messagesService.show_message('success', data.message);
      },function(error){
        $scope.loading = false;
        $scope.errors = error.data.data.errors;
      });
    }
}]);

