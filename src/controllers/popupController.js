var popup = require('popups');

exports.alert = function (msg){
    popup.window({
      mode: "alert",
      additionalButtonHolderClass: 'form-group',
      additionalButtonOkClass: "btn btn-block btn-primary",
      content: "<div class= form-group>" + msg + "</div>"
  });
  }
  
  exports.saveUser = function (msg, action){
    popup.window({
      mode: "alert",
      additionalButtonHolderClass: 'form-group',
      additionalButtonOkClass: "btn btn-block btn-primary",
      content: "<div class= form-group>" + msg + "</div>",
      onSubmit: function(){
        action() 
      },
      onClose: function(){
        action() 
      }
  });
  }