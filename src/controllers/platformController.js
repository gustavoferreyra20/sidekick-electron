async function getPlatformsByGame(id_game){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'platforms/join?id_game=' + id_game;

    axios.get(url)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
  })
}

async function getPlatforms(args = null){
  return new Promise((resolve, reject) =>{
    var url = process.env.SIDEKICK_API + 'platforms';

    if(args !== null){
      url = url + '/bo?' + args;
    }

    axios.get(url)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
  })
}

async function getOptions(game = null, any = false){

  var options = []
  var platforms = (game === null) ? await this.getPlatforms() : await this.getPlatformsByGame(game);

  if (any){
    options.push({value: "any", name: "Cualquier plataforma"});
  }
  
   for (var i=0, n = platforms.length; i < n; i++) { // looping over the options
      if (platforms[i]) {
        options.push({value: platforms[i].id_platform, name: utils.capitalizeFirstLetter(platforms[i].name)});
      }
  } 

  return options;
}



    module.exports = {
      getPlatformsByGame,
      getPlatforms,
      getOptions
    }