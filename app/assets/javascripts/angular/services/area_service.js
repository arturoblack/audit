var app = angular.module('areaService',['ngResource'])

app.factory('AreaService',
  ['$resource', function ($resource) {
  return $resource('/api/areas/:areaId.:format', {format: 'json'},
    {
      query: {isArray: false},
      create:{ method: 'POST' },
      update:{ method:'PUT' }
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
  return current_area;
}])