var app = angular.module('dirAutocomplete',
          [])
app.directive('autocomplete', function(){
    //usa el scope superior
    return{
      restrict: 'A',
      replace: true,
      template: '<div class="input-group">\
              <input id="search_autocomplete" type="text" class="form-control" \
              placeholder="Buscar area..."/><span class="input-group-btn">\
              <button name="seach" id="search-btn" class="btn btn-flat">\
              <i class="fa fa-search"></i></button></span></div>',
      scope:{
        autocompleteConfig: '=',
        onSelect: '&',
      },
      link: function(scope, element, attr) {
        console.log(scope.autocompleteConfig.serviceUrl)
        el = $('#search_autocomplete')
        el.autocomplete({
          serviceUrl: scope.autocompleteConfig.serviceUrl,
          minChars: scope.autocompleteConfig.minChars,
          dataType: scope.autocompleteConfig.dataType,
          onSelect: function (suggestion) {
            scope.onSelect({id: suggestion.data});
            el.val('');          
          },
          transformResult: function(response) {
            return {
                suggestions: $.map(response, function(item) {
                    return { value: item.data,
                           data: item.id };
                })
            };
          },
          showNoSuggestionNotice: true,
          noSuggestionNotice: 'Sin resultados...'
        });
      }          
    }
  });