angular.module('myAppPlatformService', ['myApp'])

  .factory('platforms', ['API_BASE_URL', 'games', function (API_BASE_URL, games) {
    return {
      getAll: async function () {
        return new Promise((resolve) => {
          var url = API_BASE_URL + '/platforms';
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
      getOptions: async function (game = null, any = false) {
  
        var options = []
        var platforms = (game === null) ? await this.getAll() : await games.getPlatforms(game);
  
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
    };
  }]);
