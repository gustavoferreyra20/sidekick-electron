angular.module('myAppRewardService', [])

  .factory('rewards', [function () {
    return {
      getAll: async function () {
        return new Promise((resolve, reject) => {
          const url = 'https://sidekick-server-nine.vercel.app/api/rewards';
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
