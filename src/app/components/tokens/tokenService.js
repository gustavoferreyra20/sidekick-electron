angular.module('myAppTokenService', [])

.factory('tokens', [function(){
	return {
		create: async function(id){
            return new Promise((resolve, reject) =>{
                const token = crypto.randomBytes(20).toString('hex');
                const expire = new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000);
                const url = process.env.SIDEKICK_API + 'tokens';
               
                let data = {
                  id_user: id,
                  token: token,
                  expiration_date: expire.toISOString().slice(0, 10),
                  platform: "electron"
                }

                axios.post(url, data)
                .then(() => {
                    resolve(token)
                })
                .catch(function(error) {
                  console.log(error);
                });;
            })
                
		},
    delete: async function(token){
        const url = process.env.SIDEKICK_API + 'tokens/bo?token='+ token;
        await axios.delete(url)
        .catch(function(error) {
          console.log(error);
        });; 
		}
	};
}]);