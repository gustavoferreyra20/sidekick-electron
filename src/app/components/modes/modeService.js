angular.module('myAppModeService', ['myApp'])
  .factory('modes', ['API_BASE_URL', function (API_BASE_URL) {
    return {
      getAll: async function () {
        return new Promise((resolve) => {
          var url = API_BASE_URL + '/modes';
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
      getOptions: async function (any = false) {

        var options = []
        var modes = await this.getAll();

        if (any) {
          options.push({ value: "any", name: "Cualquier modo" });
        }

        for (var i = 0, n = modes.length; i < n; i++) { // looping over the options
          if (modes[i]) {
            options.push({ value: modes[i].id_mode, name: utils.capitalizeFirstLetter(modes[i].name) });
          }
        }

        return options;
      }
    };
  }]);
