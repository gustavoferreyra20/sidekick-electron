angular.module('myAppPlatformService', [])

  .factory('platforms', [function () {
    return {
      getAll: async function (args = null) {
        return new Promise((resolve, reject) => {
          var url = process.env.SIDEKICK_API + 'platforms';

          if (args !== null) {
            const params = new URLSearchParams(args)
            url = url + '/bo?' + params;
          }

          axios.get(url)
            .then((res) => {
              resolve(res.data)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },
      getOptions: async function (game = null, any = false) {

        var options = []
        var platforms = (game === null) ? await this.getAll() : await this.getByGame(game);

        if (any) {
          options.push({ value: "any", name: "Cualquier plataforma" });
        }

        for (var i = 0, n = platforms.length; i < n; i++) { // looping over the options
          if (platforms[i]) {
            options.push({ value: platforms[i].id_platform, name: utils.capitalizeFirstLetter(platforms[i].name) });
          }
        }

        return options;
      },
      getByGame: async function (id_game) {

        return new Promise((resolve, reject) => {
          const url = process.env.SIDEKICK_API + 'platforms/join?id_game=' + id_game;

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
