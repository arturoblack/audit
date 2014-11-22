var app = angular.module('areaService',['ngResource'])

app.factory('AreaService',
  ['$resource', function ($resource) {
  return $resource('/api/areas/:areaId/:resources.:format', {format: 'json'},
    {
      create: { method: 'POST' },
      update: { method:'PUT' },
      procesos: { method: 'GET',
        params: {areaId: '@areaId',resources: 'procesos'}},
      create_proceso: { method: 'POST',
        params: {areaId: '@areaId',resources: 'procesos'}},
      auditorias: { method: 'GET',
        params: {areaId: '@areaId',resources: 'auditorias'}},
      create_auditoria: { method: 'POST',
                params: {areaId: '@areaId',resources: 'auditorias'}},
      indicadores: { method: 'GET',
                params: { areaId: '@areaId',resources: 'auditorias'}},
      create_indicador: { method: 'POST',
                params: { areaId: '@areaId',resources: 'auditorias'}},
      indicadores_gestion: { method: 'GET', 
        params: { areaId: 'areaId', resources: 'indicadores_gestion'}},
      indicadores_operativos: { mehtod: 'GET', 
        params: { areaId: '@areaId', resources: 'indicadores_operativos'}},  
    }
  );
}]);

app.factory('currentAreaService',
  ['$rootScope', function ($rootScope) {
  var current_area = {}
  current_area.setArea = function(id,nombre){
    this.id = id;
    this.nombre = nombre;
    $rootScope.$broadcast("refreshedArea");
  }
  current_area.resetArea = function(){
    this.id = null;
    this.nombre = null;
    $rootScope.$broadcast("refreshedArea");
  }
  return current_area;
}])
