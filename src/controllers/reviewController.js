async function getAvg (condition){
    return new Promise((resolve, reject) =>{
      const url = process.env.SIDEKICK_API + 'reviews/avg?';
      const params = new URLSearchParams(condition)
  
      axios.get(url + params)
      .then((res) => {
        resolve(res.data)
      })
      .catch(function(error) {
        console.log(error);
      });
      })
    
  }

  module.exports = {
    getAvg  
  };