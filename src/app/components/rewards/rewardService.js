angular.module('myAppRewardService', ['myApp'])
  .factory('rewards', ['API_BASE_URL', function (API_BASE_URL) {
    return {
      getAll: async function () {
        return new Promise((resolve, reject) => {
          const url = API_BASE_URL + '/rewards';
          const AuthStr = 'Bearer '.concat(userSession.token);

          axios.get(url, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
    };
  }]);
