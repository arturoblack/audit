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