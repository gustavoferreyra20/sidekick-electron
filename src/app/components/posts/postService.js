angular.module('myAppPostService', [])

  .factory('posts', ['popups', function (popups) {
    return {
      getAll: async function (args = null) {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'posts';

          if (args !== null) {
            const params = new URLSearchParams(args);
            url = url + '?' + params;
          }

          axios.get(url)
            .then((res) => {
              resolve(res.data);
            })
        })

      },
      save: async function (post) {
        const url = process.env.SIDEKICK_API + 'posts';
        let data = {
          id_user: userSession.id_user,
          id_game: post.game.value,
          id_platform: post.platform.value,
          id_mode: post.mode.value,
          requiredUsers: post.userRequire,
          actualUsers: 0,
          title: post.title,
          description: (post.description != null) ? post.description : ''
        }

        axios.post(url, data)
          .then(() => {
            popups.function("Anuncio creado con exito", function () { (location.reload()) })
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      remove: async function (id_post) {
        const url = process.env.SIDEKICK_API + 'posts/' + id_post;
        await axios.delete(url)
          .catch(function (error) {
            console.log(error);
          });;
      },
      getApplications: async function (args) {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'posts/join?';
          const params = new URLSearchParams(args)

          axios.get(url + params)
            .then((res) => {
              resolve(res.data)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
      getApplications: async function (args) {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'posts/join?';
          const params = new URLSearchParams(args)

          axios.get(url + params)
            .then((res) => {
              resolve(res.data)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
      removeApplication: async function (id_post, id_application) {
        const url = process.env.SIDEKICK_API + 'posts/' + id_post + '/applications/' + id_application;
        await axios.delete(url)
          .catch(function (error) {
            console.log(error);
          });;
      },
      addApplication: async function (id_post) {
        const url = process.env.SIDEKICK_API + 'posts/' + id_post + '/applications/' + userSession.id_user;

        await axios.post(url)
          .catch(function (error) {
            console.log(error);
          });
      },
      updateApplication: async function (id_post, id_application, status) {
        const url = process.env.SIDEKICK_API + 'posts/' + id_post + '/applications/' + id_application + '?status=' + status;

        await axios.put(url)
          .catch(function (error) {
            console.log(error);
          });
      }
    };
  }]);