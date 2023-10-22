const axios = require("axios");
const utils = require("./assets/scripts/utils");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var popup = require('popups');
const { ipcRenderer } = require("electron");
const { shell } = require("electron");

var userSession;

var app = angular.module("myAppRouter", ["ui.router"]);

app.config(async function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('loading');

    $stateProvider
        .state("login", {
            url: '/login',
            templateUrl: "app/components/login/login.html",
            controller: "loginCtrl"
        })
        .state("registration", {
            url: '/registration',
            templateUrl: "app/components/registration/registration.html",
            controller: "registrationCtrl"
        })
        .state("home", {
            url: '/home',
            templateUrl: "app/components/home/home.html",
            controller: "homeCtrl"
        })
        .state("games", {
            url: '/games',
            templateUrl: "app/components/games/games.html",
            controller: "gameCtrl"
        })
        .state("newPost", {
            url: '/newPost',
            templateUrl: "app/components/newPost/newPost.html",
            controller: "newPCtrl"
        })
        .state("applications", {
            url: '/applications',
            templateUrl: "app/components/applications/applications.html",
            controller: "applicationCtrl"
        })
        .state("profile", {
            url: '/profile?id_user',
            templateUrl: "app/components/profile/profile.html",
            controller: "profileCtrl"
        })
        .state("config", {
            url: '/config',
            templateUrl: "app/components/config/config.html",
            controller: "configCtrl"
        })
        .state("store", {
            url: '/store',
            templateUrl: "app/components/store/store.html",
            controller: "storeCtrl"
        })
        .state("loading", {
            url: '/loading',
            templateUrl: "app/components/loading/loading.html"
        })
        .state("rate", {
            url: '/rate?id_user&id_post&id_application',
            templateUrl: "app/components/rate/rate.html",
            controller: "rateCtrl"
        });

});

ipcRenderer.on('userSession-data', async (event, cookie) => {

    if (cookie[0]) {
        const cookieData = JSON.parse(cookie[0].value);

        const url = process.env.SIDEKICK_API + 'tokens/' + cookieData.tokenData.id_token;

        axios.get(url)
            .then(function (response) {
                if (response) {
                    const dbToken = response.data;
                    if (isTokenValid(dbToken)) {
                        redirectToHomePage(cookie[0].value);
                        setNavImages();
                    } else {
                        redirectToLoginPage();
                    }
                } else {
                    redirectToLoginPage();
                }
            }).catch(function (error) {
                console.log(error);
            });

    } else {
        redirectToLoginPage();
    }
})

function isTokenValid(dbToken) {
    const currentDate = new Date();
    const expirationDate = new Date(dbToken.expiration_date);
    return currentDate < expirationDate;
}

function redirectToHomePage(cookie_value) {
    userSession = JSON.parse(cookie_value);
    window.location.href = "#/home";
}
function setNavImages() {
    const navImages = document.querySelectorAll('.nav-item');
    navImages[0].classList.add('current');

    for (let i = 0; i < navImages.length; i++) {
        navImages[i].addEventListener("click", function () {
            Array.from(navImages, navImage => navImage.classList.remove('current'));
            navImages[i].classList.add('current');
        });
    }
}

function redirectToLoginPage() {
    window.location.href = "#/login";
}