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
      console.log(data);
      $scope.indicadores = data.indicadores;
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
  $scope.createIndicador = function(indicador){
    console.log(indicador);
    $scope.loading = true;
    var type= 'indicadores';
    if(indicador.type==1){
      type = 'indicadores_gestion';
      AreaService.create_indicador({areaId:$scope.area.id, type:type, indicador_gestion:indicador}).
        $promise.then(
          function(data){
            console.log("return message from create Indicador");
            console.log(data);
            $location.path('/areas/' + $scope.area.id + '/indicadores');
            messagesService.show_message('success', data.message);
          }, function(error){
            $scope.loading = false;
            $scope.errors = error.data.errors;
          }
        );
    }  
    if(indicador.type==2){  
      type = 'indicadores_operativos';
      AreaService.create_indicador({areaId:$scope.area.id, type:type, indicador_operativo:indicador}).
        $promise.then(
          function(data){
            console.log("return message from create Indicador");
            console.log(data);
            //  $location.path('/areas/' + $scope.area.id + '/indicadores');
            messagesService.show_message('success', data.message);
          }, function(error){
            $scope.loading = false;
            $scope.errors = error.data.errors;
          }
        );
    }
    
  }
}]);



