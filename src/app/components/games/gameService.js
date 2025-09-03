angular.module('myAppGameService', ['myApp'])
  .factory('games', ['API_BASE_URL', function (API_BASE_URL) {
    const AuthStr = 'Bearer '.concat(userSession.token);

    return {
      getAll: async function () {
        return new Promise((resolve) => {
          const url = API_BASE_URL + '/games';

          axios.get(url, { headers: { Authorization: AuthStr } })
            .then((res) => {
              resolve(res.data)
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
                options.push({ value: games[i].id_game, name: utils.capitalizeFirstLetter(games[i].name) });
              }
            }

            return options;
          }).then((options) => { resolve(options) });


        })
      },
      getPlatforms: async function (id_game) {
        return new Promise((resolve) => {
          const url = API_BASE_URL + '/games/' + id_game + '/platforms';

          axios.get(url, { headers: { Authorization: AuthStr } })
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

