const axios = require("axios");
const utils = require("./assets/scripts/utils");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var popup = require('popups');
const { ipcRenderer }= require("electron");
const { shell }= require("electron");

var userSession;

var app = angular.module("myAppRouter", ["ui.router"]);

app.config(async function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('loading');
    
            $stateProvider
            .state("login", {
                url: '/login',
                templateUrl : "app/components/login/login.html",
                controller: "loginCtrl"
            })
            .state("registration", {
                url: '/registration',
                templateUrl : "app/components/registration/registration.html",
                controller: "registrationCtrl"
            })
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
                url: '/loading',
                templateUrl : "app/components/loading/loading.html"
            })
            .state("rate", {
                url: '/rate?id_user&id_post',
                templateUrl : "app/components/rate/rate.html",
                controller: "rateCtrl"
          });

    });

    ipcRenderer.on('userSession-data', async (event, cookie) => { 
        
        if(cookie[0]){
            userSession = JSON.parse(cookie[0].value);
            window.location.href = "#/home";
            
            const navImages = document.querySelectorAll('.nav-item');

              for (let i = 0; i < navImages.length; i++) {
                  
                  navImages[i].addEventListener("click", function() {
                  Array.from(navImages, navImage => navImage.classList.remove('current'));
                  navImages[i].classList.add('current');
                  });
              }
        }else{
            window.location.href = "#/login";
        }
    })       