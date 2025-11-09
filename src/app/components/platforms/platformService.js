angular.module('myAppPlatformService', ['myApp'])

  .factory('platforms', ['API_BASE_URL', 'games', function (API_BASE_URL, games) {
    return {
      getAll: async function () {
        return new Promise((resolve) => {
          var url = API_BASE_URL + '/platforms/igdb/search';
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
      getOptions: async function (game = null) {
  
        var options = []
        var platforms;
        
        platforms = game.full.platforms;


        for (var i = 0, n = platforms.length; i < n; i++) { // looping over the options
          if (platforms[i]) {
            var platformId = platforms[i].id_platform || platforms[i].id;
            var platformName = platforms[i].name;
            
            options.push({ 
              value: platformId, 
              name: utils.capitalizeFirstLetter(platformName),
              id: platformId
            });
          }
        }
  
        return options;
      },
    };
  }]);
