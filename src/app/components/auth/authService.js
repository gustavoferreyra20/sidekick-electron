angular.module('myAppAuthService', [])

    .factory('auth', ['popups', function (popups) {
        return {

            login: async function (obj) {
                const url = process.env.SIDEKICK_API + 'auth/login';

                let data = {
                    email: obj.email,
                    password: obj.password,
                };

                axios.post(url, data)
                    .then((res) => {
                        // create the cookie
                        if (res.data) {
                            let userSession = res.data;

                            ipcRenderer.invoke("login", userSession);
                        } else {
                            popups.alert("Usuario y/o contraseña incorrectas")
                        };

                    })
                    .catch(function (error) {
                        console.log(error);
                        popups.alert("Usuario y/o contraseña incorrectas")
                    });
            },
            register: async function (obj) {
                return new Promise((resolve, reject) => {
                    const url = process.env.SIDEKICK_API + 'auth/register';

                    axios.post(url, obj)
                        .then(function (response) {
                            resolve(response.data);
                        })
                        .catch(function (error) {
                            if (error.response && error.response.status === 400) {
                                popups.alert("Usuario existente")
                            } else {
                                console.log(error);
                            }
                        });
                });
            },
            resetPassword: async function (data) {
                return new Promise((resolve, reject) => {
                    const url = process.env.SIDEKICK_API + 'auth/resetPassword';

                    axios.post(url, data)
                        .then((res) => {
                            resolve(res.data)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
            }
        }
    }])