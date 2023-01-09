async function saveApplication(data){
    const url = process.env.SIDEKICK_API + 'applications';

    axios.post(url, data)
    .catch(function(error) {
      console.log(error);
    }); 
}


  module.exports = {
    saveApplication
  };