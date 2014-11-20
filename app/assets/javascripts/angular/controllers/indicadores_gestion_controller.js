var app = angular.module('indicadoresGestionApp.Controllers',
  ['ngRoute', 'ui.bootstrap','areaService','messagesService','titleService'])

app.controller('areaIndicadoresGestionController',
  ['$scope','$route', '$routeParams', 'AreaService', 'currentAreaService', 
  'messagesService', 'titleService',
  function($scope,$route, $routeParams, AreaService, currentAreaService, 
    messagesService, titleService){
  $scope.hola = 'hola indicadoresssss gestionnnnnnnnn 2 indicadores';  
  AreaService.auditorias({ areaId: $routeParams.areaId }).$promise.then(
    function(data) {
      $scope.area = data.area;
      titleService.setTitle($scope.area.nombre + ' > Auditorias')
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.auditorias = data.auditorias;
      $scope.loading_area = false; 
  });
}]);

