angular.module('myAppUserService', [])

  .factory('users', ['popups', function (popups) {
    return {
      get: async function (id_user) {
        return new Promise((resolve, reject) => {
          const url = process.env.SIDEKICK_API + 'users/' + id_user;
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
      getApplications: async function (type) {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'users/' + userSession.id + '/applications?type=' + type;
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
      getReviews: async function (id_user) {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'users/' + id_user + '/reviews';
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
      addReview: async function (id_user, data) {
        return new Promise((resolve, reject) => {
          const url = process.env.SIDEKICK_API + 'users/' + id_user + '/reviews/' + userSession.id;
          const AuthStr = 'Bearer '.concat(userSession.token);

          axios.post(url, data, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
      getStats: async function (id_user) {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'users/' + id_user + '/stats';
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
      getRewards: async function (id_user) {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'users/' + id_user + '/rewards';
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
      addContact_inf_list: async function (id_user, id_contact_inf, nickname) {
        var url = process.env.SIDEKICK_API + 'auth/' + id_user + '/contact_inf/' + id_contact_inf;
        const data = {
          nickname: nickname
        };
        console.log(url)
        axios.post(url, data)
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }])