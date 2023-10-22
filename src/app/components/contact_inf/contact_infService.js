angular.module('myAppContact_infService', [])

  .factory('contact_inf', [function () {
    return {
      getAll: async function () {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'contact_inf';

          axios.get(url)
            .then((res) => {
              resolve(res.data)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      }
    };
  }]);
