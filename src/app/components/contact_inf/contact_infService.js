angular.module('myAppContact_infService', [])

.factory('contact_inf', [function(){
	return {
		getAll: async function(args = null){
            return new Promise((resolve, reject) =>{
                var url = process.env.SIDEKICK_API + 'contact_inf';
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
	};
}]);
