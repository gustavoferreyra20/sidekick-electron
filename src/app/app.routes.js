const axios = require("axios");
const utils = require("./assets/scripts/utils");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var popup = require('popups');
const { ipcRenderer } = require("electron");
const { shell } = require("electron");
const { resolve } = require("path");

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
        .state("forgotPassword", {
            url: '/forgotPassword',
            templateUrl: "app/components/forgotPassword/forgotPassword.html",
            controller: "forgotPasswordCtrl"
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
        .state("notifications", {
            url: '/notifications',
            templateUrl: "app/components/notifications/notifications.html",
            controller: "notificationsCtrl"
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

ipcRenderer.on('userSession-data', async (event, args) => {
    if (Array.isArray(args) && args.length > 0) {
        let data = JSON.parse(args[0].value);
        redirectToHomePage(data);
    } else if (typeof args === 'object' && args.token) {
        redirectToHomePage({ id: args.id, token: args.token });
    } else {
        redirectToLoginPage();
    }
});

function redirectToHomePage(args) {
    userSession = args;
    window.location.href = "#/home";
}

function redirectToLoginPage() {
    window.location.href = "#/login";
}