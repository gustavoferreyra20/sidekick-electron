angular.module('myAppPostService', ['myApp'])
  .factory('posts', ['API_BASE_URL', function (API_BASE_URL) {
    const AuthStr = 'Bearer '.concat(userSession.token);

    return {
      getAll: async function (args = null) {
        return new Promise((resolve) => {
          var url = API_BASE_URL + '/posts';

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
      getByUser: async function (id_user) {
        return new Promise((resolve) => {
          const url = API_BASE_URL + '/posts/user/' + id_user;

          axios.get(url, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data);
            });
        });
      },
      save: async function(post) {
        const url = API_BASE_URL + '/posts';
        let data = {
          id_user: userSession.id,
          id_game: post.game.value,
          id_platform: post.platform.id,
          id_mode: post.mode.id,
          requiredusers: post.userRequire,
          actualusers: 0,
          title: post.title,
          description: (post.description != null) ? post.description : ''
        };
        return axios.post(url, data, { headers: { Authorization: AuthStr } });
      },
      update: async function (id_post, post) {
        const url = API_BASE_URL + '/posts/' + id_post;

        const data = {
          title: post.title,
          description: (post.description != null) ? post.description : '',
          id_platform: post.platform.id,
          id_mode: post.mode.id,
          requiredusers: post.userRequire
        };

        return axios.put(url, data, { headers: { Authorization: AuthStr } });
      },
      getSingle: async function (id_post) {
        const url = API_BASE_URL + '/posts/' + id_post;
        const res = await axios.get(url, { headers: { Authorization: AuthStr } });
        return res.data;
      },
      remove: async function (id_post) {
        const url = API_BASE_URL + '/posts/' + id_post;
        try {
          const res = await axios.delete(url, {
            headers: { Authorization: AuthStr }
          });
          return res.data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      removeApplication: async function (id_post, id_application) {
        const url =
          API_BASE_URL +
          '/posts/' + id_post +
          '/applications/' + id_application;

        try {
          const res = await axios.delete(url, {
            headers: { Authorization: AuthStr }
          });
          return res.data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      addApplication: async function (id_post) {
        const url =
          API_BASE_URL +
          '/posts/' + id_post +
          '/applications';

        try {
          const res = await axios.post(
            url,
            null,
            { headers: { Authorization: AuthStr } }
          );
          return res.data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      updateApplication: async function (id_post, id_application, status) {
        const url =
          API_BASE_URL +
          '/posts/' + id_post +
          '/applications/' + id_application +
          '?status=' + status;

        try {
          const res = await axios.put(
            url,
            null,
            { headers: { Authorization: AuthStr } }
          );
          return res.data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    };
  }]);