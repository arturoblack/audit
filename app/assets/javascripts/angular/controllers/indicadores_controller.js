var app = angular.module('indicadoresApp.Controllers',
  ['ngRoute', 'ui.bootstrap','areaService','messagesService','titleService'])

app.controller('areaIndicadoresController',
  ['$scope','$route', '$routeParams', 'AreaService', 'currentAreaService','messagesService',
  'titleService',
  function($scope,$route, $routeParams, AreaService, currentAreaService,messagesService,
    titleService){
  $scope.state = 'indicadores';  
  $scope.loading_area = true;  
  AreaService.auditorias({ areaId: $routeParams.areaId }).$promise.then(
    function(data) {
      $scope.area = data.area;
      titleService.setTitle($scope.area.nombre + ' > Auditorias')
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.auditorias = data.auditorias;
      $scope.loading_area = false; 
  });
  $scope.nuevoIndicador = function(){
    titleService.setTitle($scope.area.nombre + ' > Nuevo Indicador')
    $scope.state = 'indicadores.new' 
  }
  $scope.listarIndicadores = function(){
    $route.reload(); 
  }
  $scope.$on('switchView', function(event, new_state) {
    $scope.state = new_state;
  });   
}]);



