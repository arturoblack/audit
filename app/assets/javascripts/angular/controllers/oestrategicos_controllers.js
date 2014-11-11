var app = angular.module('oestrategicosApp.Controllers',
  ['ngRoute', 'ui.bootstrap', 'oestrategicoService', 'messagesService', 
  'titleService']);

app.controller('indexOestrategicosController',
  ['$scope', '$routeParams', '$location', 'OestrategicoService', 'titleService',
  function($scope, $routeParams, $location, OestrategicoService, titleService){
    titleService.setTitle('Objectivos Estratégicos')
    $scope.oestrategicos = OestrategicoService.query()
}]);


app.controller('createOestrategicosController',
  ['$scope', '$routeParams', '$location', 'OestrategicoService',
  'titleService', 'messagesService',
  function($scope, $routeParams, $location, OestrategicoService, titleService,
    messagesService){
    titleService.setTitle('Nuevo OE')
    $scope.nuevo_oe = {codigo: ''};
    $scope.loading = false;
    $scope.crearOE = function(){
      $scope.loading = true;
      OestrategicoService.create({oestrategico: $scope.nuevo_oe}).
        $promise.then(
          function(data){
            $location.path('/oestrategicos');
            messagesService.show_message('success', data.message);
          }, function(error){
            $scope.loading = false;
            $scope.errors = error.data.errors;
          });
    };
}]);


