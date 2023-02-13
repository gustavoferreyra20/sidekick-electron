const axios = require("axios");
const userController = require('./controllers/userController');
const popupController = require('./controllers/popupController');
const tokenController = require("./controllers/tokenController");
const utils = require("./assets/scripts/utils");
const { ipcRenderer }= require("electron");
const { shell }= require("electron");

var userSession;

ipcRenderer.on('userSession-data', async (event, cookie) => {
    userSession = JSON.parse(cookie[0].value);
  })

var app = angular.module("myAppRouter", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state("home", {
            url: '/home',
            templateUrl : "app/components/home/home.html",
            controller: "homeCtrl"
        })
        .state("games", {
            url: '/games',
            templateUrl : "app/components/games/games.html",
            controller: "gameCtrl"
        })
        .state("newPost", {
            url: '/newPost',
            templateUrl : "app/components/newPost/newPost.html",
            controller: "newPCtrl"
        })
        .state("applications", {
            url: '/applications',
            templateUrl : "app/components/applications/applications.html",
            controller: "applicationCtrl"
        })
        .state("profile", {
            url: '/profile',
            templateUrl : "app/components/profile/profile.html",
            controller: "profileCtrl"
        })
        .state("config", {
            url: '/config',
            templateUrl : "app/components/config/config.html",
            controller: "configCtrl"
        })
        .state("store", {
            url: '/store',
            templateUrl : "app/components/store/store.html",
            controller: "storeCtrl"
      })
        .state("loading", {
            url: '/loadng',
            templateUrl : "app/components/loadng/loadng.html"
        })
        .state("rate", {
            url: '/rate?id_user&id_post',
            templateUrl : "app/components/rate/rate.html",
            controller: "rateCtrl"
      });
    });