angular.module('myAppReviewService', [])

  .factory('reviews', [function () {
    return {
      addReward: async function (id_review, id_reward) {
        return new Promise((resolve, reject) => {
          const url = 'https://sidekick-server-nine.vercel.app/api/reviews/' + id_review + '/rewards/' + id_reward;
          const AuthStr = 'Bearer '.concat(userSession.token);

          axios.post(url, null, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      }
    };
  }]);
