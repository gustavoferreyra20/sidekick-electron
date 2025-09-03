angular.module('myAppReviewService', ['myApp'])
  .factory('reviews', ['API_BASE_URL', function (API_BASE_URL) {
    return {
      addReward: async function (id_review, id_reward) {
        return new Promise((resolve) => {
          const url = API_BASE_URL + '/reviews/' + id_review + '/rewards/' + id_reward;
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
