angular.module('myAppPopupService', [])

  .factory('popups', [function () {
    return {
      alert: function (msg) {
        popup.window({
          mode: "alert",
          additionalButtonHolderClass: 'form-group',
          additionalButtonOkClass: "btn btn-block btn-success",
          content: "<div class= form-group>" + msg + "</div>"
        });
      },
      function(msg, action) {
        popup.window({
          mode: "alert",
          additionalButtonHolderClass: 'form-group',
          additionalButtonOkClass: "btn btn-block btn-success",
          content: "<div class= form-group>" + msg + "</div>",
          onSubmit: function () {
            action()
          },
          onClose: function () {
            action()
          }
        });
      },
      confirm: async function (msg, actionConfirm) {
        popup.confirm({
          window: "confirm",
          additionalButtonHolderClass: 'form-group',
          additionalButtonOkClass: "btn btn-block btn-success",
          additionalButtonCancelClass: "btn btn-block btn-danger",
          content: "<div class= form-group>" + msg + "</div>",
          labelOk: 'Si',
          labelCancel: 'No',
          onSubmit: function () {
            actionConfirm();
          }
        });
      },
      contactInf: async function (contactInf) {
        let content = "<div class='form-group contactInf-container'>";

        contactInf.forEach(contact => {
          let iconHtml = `<img class='contactInf-img fit-image' crossorigin='anonymous' src='${process.env.SIDEKICK_API}images/${contact.img}'>`;
          let nickname = contact.users_contact_inf.nickname || "No nickname"; // Fallback if nickname is empty

          content += `
                <div class='item contactInf'>
                    ${iconHtml}
                    <span>${nickname}</span>
                </div>
            `;
        });

        content += "</div>";

        popup.window({
          mode: "alert",
          additionalButtonHolderClass: 'form-group',
          additionalButtonOkClass: "btn btn-block btn-success",
          content: content,
        });

      }
    }
  }])