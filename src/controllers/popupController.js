var popup = require('popups');

exports.alert = function (msg){
    popup.window({
      mode: "alert",
      additionalButtonHolderClass: 'form-group',
      additionalButtonOkClass: "btn btn-block btn-primary",
      content: "<div class= form-group>" + msg + "</div>"
  });
  }
  
exports.action = function (msg, action){
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

  exports.confirm = function (msg, actionConfirm){
    popup.confirm({
      window: "confirm",
      additionalButtonHolderClass: 'form-group',
      additionalButtonOkClass: "btn btn-block btn-primary",
      additionalButtonCancelClass: "btn btn-block btn-danger",
      content: "<div class= form-group>" + msg + "</div>",
      labelOk:     'Si',
      labelCancel: 'No',
      onSubmit: function() {
        actionConfirm();
      }
  });
  }  
 