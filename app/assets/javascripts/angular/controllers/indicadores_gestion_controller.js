var app = angular.module('indicadoresGestionApp.Controllers',
  ['ngRoute', 'ui.bootstrap','areaService','messagesService','titleService'])

app.controller('areaIndicadoresGestionController',
  ['$scope','$route', '$routeParams', 'AreaService', 'currentAreaService', 
  'messagesService', 'titleService',
  function($scope,$route, $routeParams, AreaService, currentAreaService, 
    messagesService, titleService){
  $scope.state = 'indicadores';  
  AreaService.indicadores_gestion({ areaId: $routeParams.areaId }).
    $promise.then(
    function(data) {
      $scope.area = data.area;
      titleService.setTitle($scope.area.nombre + ' > Indicadores de Gestión')
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.indicadores_gestion = data.indicadores_gestion;
      $scope.loading_area = false; 
  });
}]);

