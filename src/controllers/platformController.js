const axios = require("axios");
var arrOptions = [];

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

  var platforms = (game === null) ? await this.getPlatforms() : await this.getPlatformsByGame(game);

  if (any){
    arrOptions.push("<option value='all'>Cualquier plataforma</option>");
  }
  
   for (var i=0, n = platforms.length; i < n; i++) { // looping over the options
      if (platforms[i]) {
          arrOptions.push("<option value='" + platforms[i].id_platform + "'>" + platforms[i].name + "</option>");
      }
  } 

  document.getElementById("platform").innerHTML = arrOptions.join('');
  arrOptions = []; 
    
}


    module.exports = {
      getPlatformsByGame,
      getPlatforms,
      getOptions
    }