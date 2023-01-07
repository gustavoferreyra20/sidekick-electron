const axios = require("axios");
var arrOptions = [];

async function getModes(args = null){
  return new Promise((resolve, reject) =>{
    var url = process.env.SIDEKICK_API + 'modes';

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

async function getOptions(any = false){

  var modes = await this.getModes();

  if (any){
    arrOptions.push("<option value='all'>Cualquier modo</option>");
  }
  
   for (var i=0, n = modes.length; i < n; i++) { // looping over the options
      if (modes[i]) {
          arrOptions.push("<option value='" + modes[i].id_mode + "'>" + utils.capitalizeFirstLetter(modes[i].name) + "</option>");
      }
  } 

  document.getElementById("mode").innerHTML = arrOptions.join('');
  arrOptions = []; 
    
}

    module.exports = {
      getModes,
      getOptions
    }