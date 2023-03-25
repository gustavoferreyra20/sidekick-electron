angular.module('myAppPostService', [])

  .factory('posts', ['popups', function (popups) {
    return {
      getAll: async function (args = null) {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams(args)
          var url = process.env.SIDEKICK_API + 'posts';

          if (args !== null) {
            url = url + '/bo?' + params;
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
        const url = process.env.SIDEKICK_API + 'posts/bo?id_post=' + id_post;
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
      removeApplication: async function (id_post, id_user) {
        const url = process.env.SIDEKICK_API + 'posts/join?id_post=' + id_post + '&id_user=' + id_user;
        await axios.delete(url)
          .catch(function (error) {
            console.log(error);
          });;
      },
      addApplication: async function (args) {
        const url = process.env.SIDEKICK_API + 'posts/join?';
        const params = new URLSearchParams(args)

        await axios.put(url + params)
          .catch(function (error) {
            console.log(error);
          });
      }
    };
  }]);