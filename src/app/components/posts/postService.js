angular.module('myAppPostService', [])

  .factory('posts', ['popups', function (popups) {
    const AuthStr = 'Bearer '.concat(userSession.token);

    return {
      getAll: async function (args = null) {
        return new Promise((resolve, reject) => {
          var url = 'https://sidekick-server-nine.vercel.app/api/posts';

          if (args !== null) {
            const params = new URLSearchParams(args);
            url = url + '?' + params;
          }

          axios.get(url, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data);
            })
        })

      },
      save: async function (post) {
        const url = 'https://sidekick-server-nine.vercel.app/api/posts';
        let data = {
          id_user: userSession.id,
          id_game: post.game.value,
          id_platform: post.platform.value,
          id_mode: post.mode.value,
          requiredusers: post.userRequire,
          actualusers: 0,
          title: post.title,
          description: (post.description != null) ? post.description : ''
        }

        axios.post(url, data, { headers: { Authorization: AuthStr } })
          .then(() => {
            popups.function("Anuncio creado con exito", function () { (location.reload()) })
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      remove: async function (id_post) {
        const url = 'https://sidekick-server-nine.vercel.app/api/posts/' + id_post;
        await axios.delete(url, { headers: { Authorization: AuthStr } })
          .catch(function (error) {
            console.log(error);
          });;
      },
      removeApplication: async function (id_post, id_application) {
        const url = 'https://sidekick-server-nine.vercel.app/api/posts/' + id_post + '/applications/' + id_application;
        await axios.delete(url, { headers: { Authorization: AuthStr } })
          .catch(function (error) {
            console.log(error);
          });;
      },
      addApplication: async function (id_post) {
        const url = 'https://sidekick-server-nine.vercel.app/api/posts/' + id_post + '/applications';

        await axios.post(url, null, { headers: { Authorization: AuthStr } })
          .catch(function (error) {
            console.log(error);
          });
      },
      updateApplication: async function (id_post, id_application, status) {
        const url = 'https://sidekick-server-nine.vercel.app/api/posts/' + id_post + '/applications/' + id_application + '?status=' + status;

        await axios.put(url, null, { headers: { Authorization: AuthStr } })
          .catch(function (error) {
            console.log(error);
          });
      }
    };
  }]);