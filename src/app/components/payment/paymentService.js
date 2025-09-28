angular.module('myAppPaymentService', [])

    .factory('payments', [function () {
        const AuthStr = 'Bearer '.concat(userSession.token);

        return {
            newPaymentMP: async function (paymentBody) {
                return new Promise((resolve) => {
                    const url = 'https://sidekick-server-nine.vercel.app/api/payments/mp';
                    console.log('Making payment request:', paymentBody);

                    axios.post(url, paymentBody, { headers: { Authorization: AuthStr } })
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