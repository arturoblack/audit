var app = angular.module('auditoriasApp.Controllers',
  ['ngRoute', 'ui.bootstrap','areaService','messagesService','titleService',
  'auditoriaService']);

app.controller('newAuditoriaController',
  ['$scope', '$routeParams', '$route', 'AreaService','messagesService',
   function($scope, $routeParams, $route, AreaService, messagesService){
    $scope.nueva_auditoria = {codigo: ''};
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
    };
}]);

app.controller('areaAuditoriasController',
  ['$scope','$route', '$routeParams', 'AreaService', 'currentAreaService','messagesService',
  'titleService','AuditoriaService','currentAuditoriaService',
  function($scope,$route, $routeParams, AreaService, currentAreaService,messagesService,
    titleService,AuditoriaService,currentAuditoriaService){
  $scope.state = 'auditorias';  
  $scope.loading_area = true;  
  $scope.prueba = moment('2012-12-12').format('DD/MM/YYYY');
  AreaService.auditorias({ areaId: $routeParams.areaId}).$promise.then(
    function(data) {
      $scope.area = data.area;
      titleService.setTitle($scope.area.nombre + ' > Auditorias');
      currentAreaService.setArea(data.area.id,data.area.nombre);
      $scope.auditorias = data.auditorias;
      $scope.loading_area = false; 
  });

  $scope.nuevaAuditoria = function(){
    titleService.setTitle($scope.area.nombre + ' > Nueva auditoria');
    $scope.state = 'auditorias.new'; 
  };

  $scope.listarAuditorias = function(){
    $route.reload(); 
  };

  $scope.verEvaluacionesIniciales = function(auditoria){
    currentAuditoriaService.setAuditoria(auditoria.id,auditoria.codigo);
    $scope.state = 'auditoria.evaluaciones_iniciales';
  };

  $scope.pdfEvaluacionesIniciales = function(auditoria){
    window.open('/api/auditorias/'+ auditoria.id + '/evaluaciones_iniciales.pdf', '_blank', ''); 
  };

  $scope.verEvaluacionesCumplimiento = function(auditoria){
    currentAuditoriaService.setAuditoria(auditoria.id,auditoria.codigo);
    $scope.state = 'auditoria.evaluaciones_cumplimiento';
  };

  $scope.pdfEvaluacionesCumplimiento = function(auditoria){
    window.open('/api/auditorias/'+ auditoria.id + '/evaluaciones_de_cumplimiento.pdf', '_blank', ''); 
  };

  $scope.empezarAuditoria = function(auditoria){
    $scope.empezando_evaluacion = true;
    AuditoriaService.empezar_auditoria({auditoriaId: auditoria.id}).$promise.then(
    function(data){
      $scope.empezando_evaluacion = false;
      currentAuditoriaService.setAuditoria(auditoria.id, auditoria.codigo);
      $scope.state = 'auditoria.evaluaciones_iniciales';
      messagesService.show_message('warning', data.message);
    },function(data){
      messagesService.show_message('error', data.data.description);
      $scope.empezando_evaluacion = false;
    });    
  };

  $scope.verificarCumplimiento = function(auditoria){
    $scope.empezando_evaluacion = true;
    AuditoriaService.verificar_cumplimiento({auditoriaId: auditoria.id}).$promise.then(
    function(data){
      $scope.empezando_evaluacion = false;
      currentAuditoriaService.setAuditoria(auditoria.id, auditoria.codigo);
      $scope.state = 'auditoria.evaluaciones_cumplimiento';
      messagesService.show_message('warning', data.message);
    },function(data){
      messagesService.show_message('error', data.data.description);
      $scope.empezando_evaluacion = false;
    });    
  };

  $scope.cerrarAuditoria = function(auditoria){
    auditoria.grafica.text = 'Ver gráfica';
    auditoria.grafica.status = 'off';
    AuditoriaService.finalizar_auditoria({auditoriaId: auditoria.id}).$promise.then(
    function(data){
      auditoria.state = 'finalizada';
      messagesService.show_message('warning', data.message);
    },function(data){
      messagesService.show_message('error', data.data.description);
    }); 
  };

  $scope.toggleGrafica = function(auditoria){
    if(auditoria.grafica.status === 'off'){
      auditoria.grafica.text = 'Ocultar gráfica';
      auditoria.grafica.status = 'on';
      currentAuditoriaService.setAuditoria(auditoria.id, auditoria.codigo);
    }else{
      auditoria.grafica.text = 'Ver gráfica';
      auditoria.grafica.status = 'off';
      currentAuditoriaService.resetAuditoria();
    }    
  };

  $scope.$on('switchView', function(event, new_state) {
    $scope.state = new_state;
  });   
}]);

//Tiene que ver con las evaluacones.. se lo puede sacar en otro archivo
app.controller('evaluacionesInicialesController',
  ['$scope', '$modal', 'AuditoriaService', 'currentAuditoriaService',
  function($scope, $modal, AuditoriaService, currentAuditoriaService){
  $scope.loading_auditoria = true;
  $scope.auditoria = {id: currentAuditoriaService.id};
  $scope.grafica = {status:'off', text:'Ver gráfica'};
  AuditoriaService.evaluaciones_iniciales({auditoriaId: $scope.auditoria.id}).$promise.then(
    function(data){
      $scope.auditoria = data.auditoria;
      $scope.evaluaciones_iniciales = _.groupBy(data.evaluaciones_iniciales,
                                         function(ev){ return ev.proceso; });
      $scope.procesos = Object.keys($scope.evaluaciones_iniciales);
      $scope.loading_auditoria = false;
  });

  $scope.toggleGrafica = function(){
    if($scope.grafica.status === 'off'){
      $scope.grafica.status = 'on';
      $scope.grafica.text = 'Ocultar gráfica';
    }
    else{
      $scope.grafica.status = 'off';
      $scope.grafica.text = 'Ver gráfica';
    }
  };

  $scope.evaluar = function(evaluacion){
    $scope.grafica.status = 'off';
    $scope.grafica.text = 'Ver gráfica';
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
      evaluacion.cumplimiento = updated_evaluacion.cumplimiento;
      evaluacion.fecha_evaluacion = updated_evaluacion.fecha_evaluacion;
      evaluacion.fecha_cumplimiento = updated_evaluacion.fecha_cumplimiento;
      evaluacion.observacion = updated_evaluacion.observacion;
      evaluacion.plan_accion = updated_evaluacion.plan_accion;
      evaluacion.evaluada = updated_evaluacion.evaluada;
    });
  }
  $scope.verEvaluacionesCumplimiento = function(auditoria){
    currentAuditoriaService.setAuditoria(auditoria.id,auditoria.codigo);
    $scope.$emit('switchView', 'auditoria.evaluaciones_cumplimiento');
  }
}]);

app.controller('evaluacionesCumplimientoController',
  ['$scope', '$modal', 'AuditoriaService', 'currentAuditoriaService',
  function($scope, $modal, AuditoriaService, currentAuditoriaService){
  $scope.loading_auditoria = true;
  $scope.auditoria = {id: currentAuditoriaService.id};
  $scope.grafica = {status:'off', text:'Ver gráfica'};
  AuditoriaService.evaluaciones_de_cumplimiento({auditoriaId: $scope.auditoria.id}).$promise.then(
    function(data){
      $scope.auditoria = data.auditoria;
      $scope.evaluaciones_de_cumplimiento = _.groupBy(data.evaluaciones_de_cumplimiento,
                                         function(ev){ return ev.proceso; });
      $scope.procesos = Object.keys($scope.evaluaciones_de_cumplimiento)
      $scope.loading_auditoria = false;
  });
  $scope.toggleGrafica = function(){
    if($scope.grafica.status == 'off'){
      $scope.grafica.status = 'on';
      $scope.grafica.text = 'Ocultar gráfica';
    }
    else{
      $scope.grafica.status = 'off';
      $scope.grafica.text = 'Ver gráfica';
    }
  };

  $scope.verEvaluacionesIniciales = function(auditoria){
    currentAuditoriaService.setAuditoria(auditoria.id,auditoria.codigo);
    $scope.$emit('switchView', 'auditoria.evaluaciones_iniciales');
  }
  $scope.evaluar = function(evaluacion){
    $scope.grafica.status = 'off';
    $scope.grafica.text = 'Ver gráfica';
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
        $scope.auditoria.cumplimiento_evaluadas ++;
      }
      evaluacion.cumplimiento = updated_evaluacion.cumplimiento;
      evaluacion.fecha_evaluacion = updated_evaluacion.fecha_evaluacion;
      evaluacion.fecha_cumplimiento = updated_evaluacion.fecha_cumplimiento;
      evaluacion.observacion = updated_evaluacion.observacion;
      evaluacion.plan_accion = updated_evaluacion.plan_accion;
      evaluacion.evaluada = updated_evaluacion.evaluada;
    });
  }
}]);

app.controller('editEvaluacionInicialController',
  ['$scope', '$modalInstance', 'evaluacion','messagesService',
   'currentAuditoriaService', 'AuditoriaService',
  function($scope, $modalInstance, evaluacion, messagesService, 
    currentAuditoriaService, AuditoriaService) {
    //Hace una copia del objeto evaluacion, para que no afecte cambios
  $scope.evaluacion = angular.copy(evaluacion);
  $scope.auditoria = currentAuditoriaService;
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

app.controller('graficaIndexController',
  ['$scope','AuditoriaService', 'currentAuditoriaService',
  function($scope, AuditoriaService, currentAuditoriaService){
  $scope.auditory = currentAuditoriaService;
  $scope.loading = true;
  AuditoriaService.get({auditoriaId: $scope.auditory.id}).$promise.then(
    function(data){
      var x_auditoria = data.auditoria;
      var iniciales_cumplidas = x_auditoria.iniciales_cumplidas;
      var iniciales_incumplidas = x_auditoria.total_evaluaciones-iniciales_cumplidas;
      var finales_cumplidas = x_auditoria.finales_cumplidas;
      var finales_incumplidas = x_auditoria.total_evaluaciones-finales_cumplidas;
      if(x_auditoria.state == 'cumplimiento'){
        categories = ['PRIMERA EVALUACIÓN'];
        series = [{
            name: 'Evidencias cumplidas',
            data: [iniciales_cumplidas]
        }, {
            name: 'Evidencias incumplidas',
            data: [iniciales_incumplidas]
        }]
      }else if(x_auditoria.state == 'finalizada'){
        categories = ['PRIMERA EVALUACIÓN','EVALUACIÓN DE CUMPLIMIENTO'];
        series = [{
            name: 'Evidencias cumplidas',
            data: [iniciales_cumplidas, finales_cumplidas]

        }, {
            name: 'Evidencias incumplidas',
            data: [iniciales_incumplidas, finales_incumplidas]
        }]
      }
      //$('#index_graph'+auditoria.id).highcharts().destroy();
      var ele = $('#index_graph'+x_auditoria.id)
      ele.highcharts({
        chart: {
          type: 'column'
        },
        title: {
            text: 'AUDITORÍA'
        },
        subtitle: {
            text: x_auditoria.codigo
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            max: x_auditoria.total_evaluaciones,
            title: {
                text: 'Evidencias (#)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
      });      
      $scope.loading = false;
  });   
}]);

app.controller('graficaInicialesController',
  ['$scope','AuditoriaService', 'currentAuditoriaService',
  function($scope, AuditoriaService, currentAuditoriaService){
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
              text: 'Gráfica de evaluación inicial.'
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
app.controller('graficaCumplimientoController',
  ['$scope','AuditoriaService', 'currentAuditoriaService',
  function($scope, AuditoriaService, currentAuditoriaService){
  $scope.auditoria = currentAuditoriaService;
  $scope.loading = true;
  AuditoriaService.get({auditoriaId: $scope.auditoria.id}).$promise.then(
    function(data){
      $scope.loading = false;
      var auditoria = data.auditoria;
      var finales_cumplidas = auditoria.finales_cumplidas
      var finales_incumplidas = auditoria.total_evaluaciones-finales_cumplidas
      $('#container').highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
          },
          title: {
              text: 'Gráfica de verificación de cumplimiento.'
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
                  ['Evidencias cumplidas (' + finales_cumplidas + ')',
                  finales_cumplidas*100/auditoria.total_evaluaciones],
                  ['Evidencias no cumplidas (' + finales_incumplidas + ')',
                  finales_incumplidas*100/auditoria.total_evaluaciones]
              ]
          }]
      });
  });   
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
app.filter('myDecimal', ['$filter', function ($filter) {
  return function(input) {
    input = parseFloat(input);
    if(input % 1 === 0) {
      input = input.toFixed(0);
    }
    return input;
  };
}]);
