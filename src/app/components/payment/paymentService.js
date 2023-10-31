angular.module('myAppPaymentService', [])

    .factory('payments', [function () {
        const AuthStr = 'Bearer '.concat(userSession.token);

        return {
            newPayment: async function (reward) {
                return new Promise((resolve, reject) => {
                    const url = process.env.SIDEKICK_API + 'payment';

                    axios.post(url, reward, { headers: { Authorization: AuthStr } })
                        .then(function (response) {
                            resolve(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
            }
        }
    }])