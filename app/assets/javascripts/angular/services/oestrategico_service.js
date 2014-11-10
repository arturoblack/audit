var app = angular.module('oestrategicoService',['ngResource'])

app.factory('OestrategicoService',
  ['$resource', function ($resource) {
  return $resource('/api/oestrategicos.:format', {format: 'json'},
    {
      create: { method: 'POST' }
    }
  );
}]);
