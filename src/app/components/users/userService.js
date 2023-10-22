angular.module('myAppUserService', [])

  .factory('users', ['tokens', 'popups', function (tokens, popups) {
    return {
      get: async function (id_user) {
        return new Promise((resolve, reject) => {
          const url = process.env.SIDEKICK_API + 'users/' + id_user;

          axios.get(url)
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
          var url = process.env.SIDEKICK_API + 'users/' + userSession.id_user + '/applications?type=' + type;

          axios.get(url)
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

          axios.get(url)
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
          const url = process.env.SIDEKICK_API + 'users/' + id_user + '/reviews/' + userSession.id_user;

          axios.post(url, data)
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

          axios.get(url)
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

          axios.get(url)
            .then((res) => {
              resolve(res.data)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
      login: async function (obj) {
        const url = process.env.SIDEKICK_API + 'users/login';

        let data = {
          email: obj.email,
          password: obj.password,
        };

        axios.post(url, data)
          .then((res) => {
            // create the cookie
            if (res.data) {
              let userSession = res.data;

              tokens.create(userSession.id_user).then((response) => {
                userSession.tokenData = response;

                ipcRenderer.invoke("login", userSession)
              })
            } else {
              popups.alert("Usuario y/o contraseña incorrectas")
            };

          })
          .catch(function (error) {
            console.log(error);
            popups.alert("Usuario y/o contraseña incorrectas")
          });
      },
      save: async function (obj) {
        return new Promise((resolve, reject) => {
          const url = process.env.SIDEKICK_API + 'users';

          axios.post(url, obj)
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      },
      addContact_inf_list: async function (args) {
        const url = process.env.SIDEKICK_API + 'users/join?';

        axios.put(url, args)
          .catch(function (error) {
            console.log(error);
          });
      },
      isAuthenticated: async function (token) {
        const url = process.env.SIDEKICK_API + 'tokens?token=' + token

        try {
          const response = await axios.get(url)
          if (response.data.length > 0) {
            const dbToken = response.data[0];
            const currentDate = new Date();
            const expirationDate = new Date(dbToken.expiration_date);

            if (currentDate < expirationDate) {
              ipcRenderer.invoke("authUser", dbToken);
            } else {
              // Token expired in database
              ipcRenderer.invoke("noCookie");
            }
          } else {
            // Token not found in database
            ipcRenderer.invoke("noCookie");
          }
        } catch (error) {
          console.log(error);
        }
      },
      logout: async function () {
        tokens.delete(userSession.tokenData.id_token);
      }
    }
  }])