angular.module('myAppGameService', [])

.factory('games', function(){
	return {
		getAll: async function(){
			return new Promise((resolve, reject) =>{
                const url = process.env.SIDEKICK_API + 'games';
                
                axios.get(url)
                .then((res) => {
                  resolve(res.data)
                })
                .catch(function(error) {
                  console.log(error);
                });
                })
		},
        getOne: async function(condition){
			return new Promise((resolve, reject) =>{
                const url = process.env.SIDEKICK_API + 'games/bo?';
                const params = new URLSearchParams(condition)
            
                axios.get(url + params)
                .then((res) => {
                  resolve(res.data)
                })
                .catch(function(error) {
                  console.log(error);
                });
                })
		},
        getOptions: async function(any = false){
			return new Promise((resolve, reject) =>{
                
                this.getAll().then(function(games){
                    var options = []
                    if (any){
                        options.push({value: "any", name: "Cualquier juego"});
                      }
                      
                       for (var i=0, n = games.length; i < n; i++) { // looping over the options
                          if (games[i]) {
                            options.push({value: games[i].id_game, name: utils.capitalizeFirstLetter(games[i].name)});
                          }
                      }
                    
                      return options;
                }).then((options) => {resolve(options)});
              

                })
		}
	};
});

