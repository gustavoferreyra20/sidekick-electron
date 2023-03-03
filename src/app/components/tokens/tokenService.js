angular.module('myAppTokenService', [])

.factory('tokens', [function(){
	return {
		create: async function(id){
            return new Promise((resolve, reject) =>{
                const session = crypto.randomBytes(20).toString('hex');
                const userToken = jwt.sign({id:id}, process.env.JWT_SECRET);
                const expire = new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000);
                const url = process.env.SIDEKICK_API + 'tokens';
               
                let token = {
                  session: session,
                  token: userToken,
                  expire: expire.toISOString().slice(0, 10)
                }
            
                axios.post(url, token)
                .then(() => {
                    resolve(token)
                })
                .catch(function(error) {
                  console.log(error);
                });;
            })
                
		},
    delete: async function(args){
        const url = process.env.SIDEKICK_API + 'tokens/bo?session='+ args.session + '&token='+ args.token;
        await axios.delete(url)
        .catch(function(error) {
          console.log(error);
        });; 
		}
	};
}]);