
angular.module('myAppNotificationService', ['myApp'])

  .factory('notifications', ['API_BASE_URL', function (API_BASE_URL) {
    const AuthStr = 'Bearer '.concat(userSession.token);

    return {
      getAll: async function () {
        return new Promise((resolve) => {
          const url = API_BASE_URL + '/notifications';

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
        const url = API_BASE_URL + '/notifications/' + id_notification;
        await axios.delete(url, { headers: { Authorization: AuthStr } })
          .catch(function (error) {
            console.log(error);
          });;
      },
      bulkUpdate: async function (status) {
        const url = API_BASE_URL + '/notifications';
        await axios.put(url, { status }, { headers: { Authorization: AuthStr } })
          .catch(function (error) {
            console.log(error);
          });;
      }
    };
  }]);

