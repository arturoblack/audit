var app = angular.module('areaService',['ngResource'])

app.factory('AreaService',
  ['$resource', function ($resource) {
  return $resource('/api/areas/:areaId/:procesos.:format', {format: 'json'},
    {
      query: {isArray: false},
      create: { method: 'POST' },
      update: { method:'PUT' },
      procesos: { method: 'GET',
                params: {areaId: '@areaId',procesos: 'procesos'}},
      new_proceso: { method: 'POST',
                params: {areaId: '@areaId',procesos: 'procesos'}},          
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