var app = angular.module('titleService',['ngResource'])

app.factory('titleService',
  ['$document', function($document) {
  var suffix, title;
  suffix = title = "Clinicas Libres";
  return {
    setSuffix: function(s) {
      return suffix = s;
    },
    getSuffix: function() {
      return suffix;
    },
    setTitle: function(t) {
      if (suffix !== "") {
        title = t + ' | ' + suffix;
      } else {
        title = t;
      }
      $document.prop('title', title);
    },
    getTitle: function() {
      $document.prop('title');
    }
  };
}]);