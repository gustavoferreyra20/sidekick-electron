async function saveApplication(data){
    const url = process.env.SIDEKICK_API + 'applications';

    axios.post(url, data)
    .then(() => {
      popupController.alert("Solicitud enviada")
    })
    .catch(function(error) {
      console.log(error);
    }); 
}

async function getApplications(args = null){
  return new Promise((resolve, reject) =>{
    var url = process.env.SIDEKICK_API + 'applications';

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

async function getApplicationsByUsersPosts(id_user){
  return new Promise((resolve, reject) =>{
    var url = process.env.SIDEKICK_API + 'applications/join/?id_user=' + id_user;

    axios.get(url)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
  })
}

  module.exports = {
    getApplications,
    saveApplication,
    getApplicationsByUsersPosts
  };