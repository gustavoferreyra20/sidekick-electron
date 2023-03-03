angular.module('myAppPopupService', [])

.factory('popups', [function(){
    return{
        alert: function (msg){
            popup.window({
              mode: "alert",
              additionalButtonHolderClass: 'form-group',
              additionalButtonOkClass: "btn btn-block btn-primary",
              content: "<div class= form-group>" + msg + "</div>"
          });
          },
          function (msg, action){
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
          },
        confirm: async function (msg, actionConfirm){
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
    }
}])