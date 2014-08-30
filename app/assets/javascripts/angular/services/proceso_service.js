var app = angular.module('procesoService',['ngResource'])

app.factory('ProcesoService',
  ['$resource', function ($resource) {
  return $resource('/api/procesos/:procesoId/:evidences.:format', {format: 'json'},
    {
      evidences: { method: 'GET',
                params: {procesoId: '@procesoId',evidences: 'evidences'}},
      new_evidence: { method: 'POST',
                params: {procesoId: '@procesoId',evidences: 'evidences'}},          
    }
  );
}]);

app.factory('currentProcessService',
  ['$rootScope', function ($rootScope) {
  var current_process = {}
  current_process.setProcess = function(id){
    this.id = id;
  }
  current_process.resetProcess = function(){
    this.id = null;
  }
  return current_process;
}])