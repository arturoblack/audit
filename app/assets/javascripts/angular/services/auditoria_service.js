var app = angular.module('auditoriaService',['ngResource'])

app.factory('AuditoriaService',
  ['$resource', function ($resource) {
  return $resource('/api/auditorias/:auditoriaId/:resource/:evaluacionId.:format', {format: 'json'},
    {
      empezar_auditoria: { method: 'POST',
                params: {auditoriaId: '@auditoriaId',resource: 'empezar_auditoria'}},
      verificar_cumplimiento: { method: 'POST',
                params: {auditoriaId: '@auditoriaId',resource: 'evaluar_cumplimiento'}},
      finalizar_auditoria: { method: 'POST',
                params: {auditoriaId: '@auditoriaId',resource: 'finalizar_auditoria'}},
      evaluaciones_iniciales:{method: 'GET',
                params: {auditoriaId: '@auditoriaId',resource: 'evaluaciones_iniciales'}},
      evaluaciones_de_cumplimiento:{method: 'GET',
                params: {auditoriaId: '@auditoriaId',resource: 'evaluaciones_de_cumplimiento'}},
      update_evaluacion: { method: 'PUT',
                params: {auditoriaId: '@auditoriaId',resource: 'evaluaciones',
                        evaluacionId: '@evaluacionId'}},                             
    }
  );
}]);

app.factory('currentAuditoriaService',
  ['$rootScope', function ($rootScope) {
  var current_auditoria = {}
  current_auditoria.setAuditoria = function(id, codigo){
    this.id = id;
    this.codigo = codigo;
  }
  current_auditoria.resetAuditoria = function(){
    this.id = null;
    this.codigo = null;
  }
  return current_auditoria;
}])