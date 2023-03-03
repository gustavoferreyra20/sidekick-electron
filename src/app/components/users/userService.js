angular.module('myAppUserService', [])

.factory('users', ['tokens', 'popups', function(tokens, popups){
    return{
        get: async function(condition){
            return new Promise((resolve, reject) =>{
                const url = process.env.SIDEKICK_API + 'users/bo?';
                const params = new URLSearchParams(condition)
                
                axios.get(url + params)
                .then((res) => {
                  resolve(res.data)
                })
                .catch(function(error) {
                  console.log(error);
                });
                })
		},
        login: async function(obj){
            const url = process.env.SIDEKICK_API + 'users/bo?email='+ obj.email + '&password='+ obj.password
            axios.get(url)
            .then((res) => {
                // create the cookie
                let userSession = res.data[0];
                tokens.create(userSession.id_user).then((response) => {
                  userSession.token = response;
                  ipcRenderer.invoke("login", userSession)
                })
            })
            .catch(function(error) {
              console.log(error);
              popups.alert("Usuario y/o contraseña incorrectas")
            }); 
		},
        save: async function(obj){
            const url = process.env.SIDEKICK_API + 'users';

            let data = {
              name: obj.name,
              email: obj.email,
              description: obj.description,
              password:  obj.password,
              img: obj.img
            }
        
            axios.post(url, data)
            .catch(function(error) {
              console.log(error);
            }); 
		},
        isAuthenticated: async function(token){
            const url = process.env.SIDEKICK_API + 'tokens?session='+ token.session + '&token='+ token.token
  
            axios.get(url)
            .then((res) => {
              if(res.data.length > 0){
                ipcRenderer.invoke("authUser", token)
              }else{
                //Cookie expired in database
                ipcRenderer.invoke("noCookie")
              }
            })
            .catch(function(error) {
              console.log(error);
            }); 
		},
        logout: async function(token){
            tokens.delete(token)
		}
    }
}])