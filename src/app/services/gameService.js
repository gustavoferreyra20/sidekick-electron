angular.module('myAppGameService', ['myApp'])
  .factory('games', ['API_BASE_URL', function (API_BASE_URL) {
    const AuthStr = 'Bearer '.concat(userSession.token);

    return {
      getAll: async function (limit = 10, offset = 0, sortBy = 'updated_at', sortOrder = 'desc') {
        return new Promise((resolve) => {
          const url = API_BASE_URL + `/games/igdb?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

          axios.get(url, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data.games)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
      search: async function (limit = 10, offset = 0, sortBy = 'updated_at', sortOrder = 'desc', name = '') {
        return new Promise((resolve) => {
          const url = API_BASE_URL + `/games/igdb/search?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}&name=${name}`;

          axios.get(url, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data.games)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
      getOptions: async function (any = false) {
        return new Promise((resolve) => {

          this.getAll().then(function (games) {
            var options = []
            if (any) {
              options.push({ value: "any", name: "Cualquier juego" });
            }

            for (var i = 0, n = games.length; i < n; i++) { // looping over the options
              if (games[i]) {
                options.push({
                  value: games[i].id,
                  name: utils.capitalizeFirstLetter(games[i].name),
                  full: games[i]
                });
              }
            }

            return options;
          }).then((options) => { resolve(options) });


        })
      },
      getById: async function (id_game) {
        return new Promise((resolve) => {
          const url = API_BASE_URL + `/games/igdb/search?id=${id_game}`;

          axios.get(url, { headers: { Authorization: AuthStr } })
            .then((res) => {
              const games = res.data.games || [];
              resolve(games[0] || null);
            })
            .catch(function (error) {
              console.log(error);
              resolve(null);
            });
        });
      },
    };
  }]);

