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

async function removeApplication(id_post, id_user){
  const url = process.env.SIDEKICK_API + 'applications/bo?id_post='+ id_post + '&id_user='+ id_user;
  await axios.delete(url)
  .catch(function(error) {
    console.log(error);
  });; 
}

async function setStatus(id_application, status){

let data = {
  cond: {
    id_application: id_application
  },
  values: {
    status: status
  }
}

  const url = process.env.SIDEKICK_API + 'applications';
  await axios.put(url, data)
  .then(result => console.log(result))
  .catch(function(error) {
    console.log(error);
  }); 
}

  module.exports = {
    getApplications,
    saveApplication,
    getApplicationsByUsersPosts,
    removeApplication,
    setStatus
  };