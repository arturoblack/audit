var app = angular.module('indicadoresOperativosApp.Controllers',
  ['ngRoute', 'ui.bootstrap','areaService','messagesService','titleService'])

app.controller('areaIndicadoresOperativosController',
  ['$scope','$route', '$routeParams', 'AreaService', 'currentAreaService', 
  'messagesService', 'titleService',
  function($scope,$route, $routeParams, AreaService, currentAreaService, 
    messagesService, titleService){
  $scope.state = 'indicadores';  
  AreaService.indicadores_operativos({ areaId: $routeParams.areaId }).
    $promise.then(
    function(data) {
      $scope.area = data.area;
      titleService.setTitle($scope.area.nombre + ' > Indicadores Operativos')
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.indicadores_operativos = data.indicadores_operativos;
      $scope.loading_area = false; 
  });
}]);

