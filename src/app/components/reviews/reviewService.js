angular.module('myAppReviewService', [])

  .factory('reviews', [function () {
    return {
      addReward: async function (id_review, id_reward) {
        return new Promise((resolve, reject) => {
          const url = process.env.SIDEKICK_API + 'reviews/' + id_review + '/rewards/' + id_reward;

          axios.post(url)
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
