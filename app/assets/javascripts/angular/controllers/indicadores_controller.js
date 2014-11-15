var app = angular.module('indicadoresApp.Controllers',
  ['ngRoute', 'ui.bootstrap','areaService','messagesService','titleService'])

app.controller('areaIndicadoresController',
  ['$scope','$route', '$routeParams', 'AreaService', 'currentAreaService','messagesService',
  'titleService',
  function($scope,$route, $routeParams, AreaService, currentAreaService, messagesService,
    titleService){
  $scope.state = 'indicadores';
  $scope.loading_area = true;
  AreaService.auditorias({ areaId: $routeParams.areaId }).$promise.then(
    function(data) {
      $scope.area = data.area;
      titleService.setTitle($scope.area.nombre + ' > Auditorias');
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.auditorias = data.auditorias;
      $scope.loading_area = false; 
  });
  AreaService.indicadores({ areaId: $routeParams.areaId }).$promise.then(
    function(data) {
      $scope.indicadores = [
	{id:'GD1', nombre:'indicador 1',tipo:1,tipo2:1,descripcion:'descripcion larga'},
	{id:'GD2', nombre:'indicador 2',tipo:1,tipo2:2,descripcion:'descripcion larga'},
	{id:'GD3', nombre:'indicador 3',tipo:2,tipo2:1,descripcion:'descripcion larga'},
	{id:'GD4', nombre:'indicador 4',tipo:2,tipo2:2,descripcion:'descripcion larga'},
	{id:'GD5', nombre:'indicador 5',tipo:1,tipo2:2,descripcion:'descripcion larga'},
	{id:'GD6', nombre:'indicador 6',tipo:2,tipo2:2,descripcion:'descripcion larga'},
	{id:'GD7', nombre:'indicador 7',tipo:1,tipo2:1,descripcion:'descripcion larga'},
	{id:'GD8', nombre:'indicador 8',tipo:1,tipo2:1,descripcion:'descripcion larga'},
	{id:'GD9', nombre:'indicador 9',tipo:2,tipo2:1,descripcion:'descripcion larga'},
      ];
      titleService.setTitle($scope.area.nombre + '> Indicadores');
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



