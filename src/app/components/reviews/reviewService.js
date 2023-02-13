angular.module('myAppReviewService', [])

.factory('reviews', function(){
	return {
		getAll: async function(args = null){
            return new Promise((resolve, reject) =>{
                var url = process.env.SIDEKICK_API + 'reviews';
                const params = new URLSearchParams(args);
              
                if(args !== null){
                  url = url + '/join?' + params;
                }
              
                axios.get(url)
                .then((res) => {
                  resolve(res.data);
                })
                })
		},
        getAvg: async function(args){

            return new Promise((resolve, reject) =>{
                const url = process.env.SIDEKICK_API + 'reviews/avg?';
                const params = new URLSearchParams(args);
            
                axios.get(url + params)
                .then((res) => {
                  resolve(res.data)
                })
                .catch(function(error) {
                  console.log(error);
                });
                })
		}
        ,
        save: async function(data){

            return new Promise((resolve, reject) =>{
                const url = process.env.SIDEKICK_API + 'reviews';

                axios.post(url, data)
                .then((res) => {
                  resolve(res.data);
                })
                .catch(function(error) {
                  console.log(error);
                }); 
                })
		}
	};
});
