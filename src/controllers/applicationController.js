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

async function getApplicationsByUser(id_user){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'applications/bo?id_user=' + id_user;

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
    saveApplication,
    getApplicationsByUser
  };