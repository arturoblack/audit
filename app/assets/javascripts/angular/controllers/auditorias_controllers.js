var app = angular.module('auditoriasApp.Controllers',
  ['ngRoute', 'ui.bootstrap','areaService','messagesService','titleService'])



app.controller('areaAuditoriasController',
  ['$scope', '$routeParams', 'AreaService', 'currentAreaService',
  'titleService',
  function($scope, $routeParams, AreaService, currentAreaService,
    titleService){
  $scope.state = 'auditorias'  
  $scope.loading_area = true;  
  AreaService.auditorias({ areaId: $routeParams.areaId}).$promise.then(
    function(data) {
      $scope.area = data.area;
      titleService.setTitle($scope.area.nombre + ' > Auditorias')
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.auditorias = data.auditorias;
      $scope.loading_area = false; 
  });
  $scope.nuevaAuditoria = function(){
    titleService.setTitle($scope.area.nombre + ' > Nueva auditoria')
    $scope.state = 'auditorias.new' 
  }
  $scope.listarAuditorias = function(){
    titleService.setTitle($scope.area.nombre + ' > Auditorias')
    $scope.state = 'auditorias' 
  }  
}]);

app.controller('newAuditoriaController',
  ['$scope', '$routeParams', '$route', 'AreaService','messagesService',
   function($scope, $routeParams, $route, AreaService, messagesService){
    $scope.nueva_auditoria = {codigo: ''}
    $scope.loading = false;
    $scope.crearAuditoria = function(){
      $scope.loading = true;
      AreaService.create_auditoria({ areaId: $routeParams.areaId,
       auditoria: $scope.nueva_auditoria}).
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
