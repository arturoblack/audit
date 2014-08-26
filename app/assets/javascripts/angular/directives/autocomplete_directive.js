var app = angular.module('dirAutocomplete',
          [])
app.directive('autocomplete', function(){
  return{
    restrict: 'A',
    replace: true,
    template: '<div class="input-group">\
            <input id="search_autocomplete" type="text" class="form-control" \
            placeholder="Buscar area..."/><span class="input-group-btn">\
            <button name="seach" id="search-btn-autocomplete" class="btn btn-flat">\
            <i class="fa fa-search"></i></button></span></div>',
    scope:{
      autocompleteConfig: '=',
      onSelect: '&',
    },
    link: function(scope, element, attr) {
      el = $('#search_autocomplete')
      search_btn = $('#search-btn-autocomplete')
      el.autocomplete({
        serviceUrl: scope.autocompleteConfig.serviceUrl,
        minChars: scope.autocompleteConfig.minChars,
        dataType: scope.autocompleteConfig.dataType,
        deferRequestBy: scope.autocompleteConfig.deferRequestBy,
        onSelect: function (suggestion) {
          scope.onSelect({id: suggestion.data});
          el.val('');          
        },
        transformResult: function(response) {
          return {
              suggestions: $.map(response.areas, function(item) {
                  return { value: item.data,
                         data: item.id };
              })
          };
        },
        onSearchStart: function (query) {
          search_btn.html('<i class="fa fa-ellipsis-h"></i>')
        },
        onSearchComplete: function (query, suggestions) {
          search_btn.html('<i class="fa fa-search"></i>')
        },
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'Sin resultados...'
      });
    }          
  }
});