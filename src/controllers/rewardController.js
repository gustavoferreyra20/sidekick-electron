async function getAllRewards (){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'rewards';
    
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
	getAllRewards
};