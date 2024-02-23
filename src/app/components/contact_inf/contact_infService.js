angular.module('myAppContact_infService', [])

  .factory('contact_inf', [function () {
    return {
      getAll: async function () {
        return new Promise((resolve, reject) => {
          var url = 'https://sidekick-server-nine.vercel.app/api/contact_inf';

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
