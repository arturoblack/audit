var app = angular.module('auditoriasApp.Controllers',
  ['ngRoute', 'ui.bootstrap','areaService','messagesService','titleService',
  'auditoriaService'])

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

app.controller('areaAuditoriasController',
  ['$scope','$route', '$routeParams', 'AreaService', 'currentAreaService','messagesService',
  'titleService','AuditoriaService','currentAuditoriaService',
  function($scope,$route, $routeParams, AreaService, currentAreaService,messagesService,
    titleService,AuditoriaService,currentAuditoriaService){
  $scope.state = 'auditorias'  
  $scope.loading_area = true;  
  $scope.prueba = moment('2012-12-12').format('DD/MM/YYYY')
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
    $route.reload(); 
  }
  $scope.verEvaluacionesIniciales = function(auditoria){
    currentAuditoriaService.setAuditoria(auditoria.id,auditoria.codigo);
    $scope.state = 'auditoria.evaluaciones_iniciales'
  }
  $scope.empezarAuditoria = function(auditoria){
    $scope.empezando_evaluacion = true;
    AuditoriaService.empezar_auditoria({auditoriaId: auditoria.id}).$promise.then(
    function(data){
      $scope.empezando_evaluacion = false;
      currentAuditoriaService.setAuditoria(auditoria.id, auditoria.codigo);
      $scope.state = 'auditoria.evaluaciones_iniciales'
      messagesService.show_message('warning', data.message);
    },function(data){
      messagesService.show_message('error', data.data.description);
      $scope.empezando_evaluacion = false;
    });    
  }  
}]);


app.controller('evaluacionesInicialesController',
  ['$scope', '$modal', 'AuditoriaService', 'currentAuditoriaService',
  function($scope, $modal, AuditoriaService, currentAuditoriaService){
  $scope.loading_auditoria = true;
  $scope.auditoria = {id: currentAuditoriaService.id}
  $scope.grafica = {status:'off', text:'Ver gráfica'}
  AuditoriaService.evaluaciones_iniciales({auditoriaId: $scope.auditoria.id}).$promise.then(
    function(data){
      $scope.auditoria = data.auditoria
      $scope.evaluaciones_iniciales = _.groupBy(data.evaluaciones_iniciales,
                                         function(ev){ return ev.proceso; });
      $scope.procesos = Object.keys($scope.evaluaciones_iniciales)
      $scope.loading_auditoria = false;
  });
  $scope.toggleGrafica = function(){
    if($scope.grafica.status == 'off'){
      $scope.grafica.status = 'on'
      $scope.grafica.text = 'Ocultar gráfica'
    }
    else{
      $scope.grafica.status = 'off'
      $scope.grafica.text = 'Ver gráfica'
    }
  }
  $scope.evaluar = function(evaluacion){
    $scope.grafica.status = 'off'
    $scope.grafica.text = 'Ver gráfica'
    var modalInstance = $modal.open({
      templateUrl: 'auditorias/auditoria.evaluacion_inicial.edit.html',
      controller: 'editEvaluacionInicialController',
      resolve: {
        evaluacion: function () {
          return evaluacion;
        }
      }
    });
    modalInstance.result.then(function (updated_evaluacion) {
      if(!evaluacion.evaluada){
        $scope.auditoria.iniciales_evaluadas ++;
      }
      evaluacion.cumplimiento = updated_evaluacion.cumplimiento
      evaluacion.fecha_evaluacion = updated_evaluacion.fecha_evaluacion
      evaluacion.fecha_cumplimiento = updated_evaluacion.fecha_cumplimiento
      evaluacion.observacion = updated_evaluacion.observacion
      evaluacion.plan_accion = updated_evaluacion.plan_accion
      evaluacion.evaluada = updated_evaluacion.evaluada
    });
  }
}]);

app.controller('graficaInicialesController',
  ['$scope','AuditoriaService', 'currentAuditoriaService',
  function($scope, AuditoriaService, currentAuditoriaService){
  $scope.hola = 'awevo'
  $scope.auditoria = currentAuditoriaService;
  $scope.loading = true;
  AuditoriaService.get({auditoriaId: $scope.auditoria.id}).$promise.then(
    function(data){
      $scope.loading = false;
      var auditoria = data.auditoria;
      var iniciales_cumplidas = auditoria.iniciales_cumplidas
      var iniciales_incumplidas = auditoria.total_evaluaciones-iniciales_cumplidas
      $('#container').highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
          },
          title: {
              text: 'Gráfica de cumplimiento.'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
          },
          series: [{
              type: 'pie',
              name: 'Porcentaje',
              data: [
                  ['Evidencias cumplidas (' + iniciales_cumplidas + ')',
                  iniciales_cumplidas*100/auditoria.total_evaluaciones],
                  ['Evidencias no cumplidas (' + iniciales_incumplidas + ')',
                  iniciales_incumplidas*100/auditoria.total_evaluaciones]
              ]
          }]
      });
  });   
}]);





app.controller('editEvaluacionInicialController',
  ['$scope', '$modalInstance', 'evaluacion','messagesService',
   'currentAuditoriaService', 'AuditoriaService',
  function($scope, $modalInstance, evaluacion, messagesService, 
    currentAuditoriaService, AuditoriaService) {
    //Hace una copia del objeto evaluacion, para que no afecte cambios
  $scope.evaluacion = angular.copy(evaluacion);
  $scope.auditoria = currentAuditoriaService
  $scope.loading = false;
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };
  $scope.ok = function () {
    $scope.loading = true;
    AuditoriaService.update_evaluacion({ auditoriaId: $scope.auditoria.id,
    evaluacionId: $scope.evaluacion.id, evaluacion: $scope.evaluacion}).
    $promise.then(
      function(data) {
        $scope.loading = false;
        $modalInstance.close(data.evaluacion);
        messagesService.show_message('success', data.message);
      },function(error){
      $scope.loading = false;
      $scope.errors = error.data.data.errors;
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);



app.filter('booleano', function() {
  return function(input) {
    return input ? 'SI' : 'NO';
  };
});
app.filter('booleano_verificacion', function() {
  return function(input) {
    switch(input) {
        case true:
          return 'Cumplida';
          break;
        case false:
          return 'No cumplida'
          break;
        default:
          return '';
    }    
  };
});
