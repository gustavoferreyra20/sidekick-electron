async function getReviews (condition = null){
  return new Promise((resolve, reject) =>{
  var url = process.env.SIDEKICK_API + 'reviews';
  const params = new URLSearchParams(condition);

  if(condition !== null){
    url = url + '/join?' + params;
  }

  axios.get(url)
  .then((res) => {
    resolve(res.data);
  })
  .catch(function(error) {
    if(error.response.status == 404){
      noPost();
    }
  });
  })
  
}

async function getAvg (condition){
    return new Promise((resolve, reject) =>{
      const url = process.env.SIDEKICK_API + 'reviews/avg?';
      const params = new URLSearchParams(condition);
  
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
    getReviews,
    getAvg  
  };