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

  exports.rewardUser = function (content){
    console.log()
    popup.window({
      mode: "alert",
      additionalButtonHolderClass: 'form-group',
      additionalButtonOkClass: "btn btn-block btn-primary",
      //content: "<div class='d-flex flex-wrap' ng-controller='storeCtrl'><div class=p-4 ng-repeat=reward in rewards><img data-ng-src={{reward.img}} class=img-fluid alt={{reward.name}} ><h2>$ {{reward.price}}</h2><p>{{reward.description}}</p><button type=button class=btn btn-green ng-click=btnBuy(reward)>Comprar</button></div>",
      content: content
    });
  }  
 