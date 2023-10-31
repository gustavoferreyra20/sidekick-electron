angular.module('myAppRewardService', [])

  .factory('rewards', [function () {
    return {
      getAll: async function (args = null) {
        return new Promise((resolve, reject) => {
          const url = process.env.SIDEKICK_API + 'rewards';
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
