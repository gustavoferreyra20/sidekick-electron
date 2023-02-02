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

async function getUsersRewards (id_user){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'rewards/join?id_user=' + id_user;
    
    axios.get(url)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
    })
  
}

async function useReward (id_reward){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'rewards/join?id_reward=' + id_reward + '&id_user=' + userSession.id_user;
    
    axios.delete(url)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
    })
  
}

module.exports = {
	getAllRewards,
  getUsersRewards,
  useReward
};