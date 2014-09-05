angular.module('messagesService', []).factory('messagesService', function(){
  var message = {};
  message.show_message = function(type, message){
    toastr.options.closeButton = true;
    switch(type){
      case 'error':
        toastr.error(message, "Error")        
        break;
      case 'success':
        toastr.success(message, "OK")
        break;
      case 'warning':
        toastr.warning(message, "Mensaje")
        break;
    }
  };
  return message;
});