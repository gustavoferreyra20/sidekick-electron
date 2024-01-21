angular.module('myAppNotificationService', [])

  .factory('notifications', [function () {
    const AuthStr = 'Bearer '.concat(userSession.token);

    return {
      getAll: async function () {
        return new Promise((resolve, reject) => {
          const url = process.env.SIDEKICK_API + 'notifications';

          axios.get(url, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
      remove: async function (id_notification) {
        const url = process.env.SIDEKICK_API + 'notifications/' + id_notification;
        await axios.delete(url, { headers: { Authorization: AuthStr } })
          .catch(function (error) {
            console.log(error);
          });;
      },
      bulkUpdate: async function (status) {
        const url = process.env.SIDEKICK_API + 'notifications';
        await axios.put(url, { status }, { headers: { Authorization: AuthStr } })
          .catch(function (error) {
            console.log(error);
          });;
      }
    };
  }]);

