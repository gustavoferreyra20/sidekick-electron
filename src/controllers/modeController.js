const axios = require("axios");

async function getModes(args = null){
  return new Promise((resolve, reject) =>{
    var url = process.env.SIDEKICK_API + 'modes';
    const params = new URLSearchParams(args)

    if(args !== null){
      url = url + '/bo?' + params;
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

async function getOptions(any = false){

  var options = []
  var modes = await this.getModes();

  if (any){
    options.push({value: "any", name: "Cualquier mode"});
  }
  
   for (var i=0, n = modes.length; i < n; i++) { // looping over the options
      if (modes[i]) {
        options.push({value: modes[i].id_mode, name: utils.capitalizeFirstLetter(modes[i].name)});
      }
  } 

  return options;
}

    module.exports = {
      getModes,
      getOptions
    }