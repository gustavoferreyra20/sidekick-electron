const axios = require("axios");
const userController = require('../controllers/userController');
const popupController = require('../controllers/popupController');
const gameController = require("../controllers/gameController");
const postController = require("../controllers/postController");
const platformController = require("../controllers/platformController");
const tokenController = require("../controllers/tokenController");
const modeController = require("../controllers/modeController");
const reviewController = require("../controllers/reviewController");
const utils = require("../controllers/utils");
const { ipcRenderer }= require("electron");

var userSession;

ipcRenderer.on('userSession-data', async (event, cookie) => {
    userSession = JSON.parse(cookie[0].value);
  })

var app = angular.module("myApp", ["ngRoute"]);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "section/home.html",
            controller: "homeCtrl"
        })
        .when("/games", {
            templateUrl : "section/games.html",
            controller: "gameCtrl"
        })
        .when("/newPost", {
            templateUrl : "section/newPost.html",
            controller: "newPCtrl"
        })
        .when("/comments", {
            templateUrl : "section/comments.html"
        })
        .when("/profile", {
            templateUrl : "section/profile.html",
            controller: "profileCtrl"
        })
        .when("/config", {
            templateUrl : "section/config.html",
            controller: "configCtrl"
        })
        .when("/loading", {
            templateUrl : "section/loadng.html"
        });
    });

    app.controller('homeCtrl', ['$scope', function($scope) {

        dynamicallyLoadScript("../Controllers/homeController.js")
    
    }]);

    app.controller('gameCtrl', ['$scope', function($scope) {

        dynamicallyLoadScript("../Controllers/gameController.js")
    
    }]);

    app.controller('postCtrl', ['$scope', function($scope) {

        dynamicallyLoadScript("../Controllers/postController.js")
    
    }]);

    app.controller('profileCtrl', ['$scope', function($scope) {

        dynamicallyLoadScript("../Controllers/profileController.js")
    
    }]);

    app.controller('configCtrl', ['$scope', function($scope) {

        dynamicallyLoadScript("../Controllers/configController.js")
    
    }]);

    app.controller('newPCtrl', ['$scope', function($scope) {

        dynamicallyLoadScript("../Controllers/newPostController.js")
    
    }]);

    function dynamicallyLoadScript(url) {
        var script = document.createElement("script");  // create a script DOM node
        script.src = url;  // set its src to the provided URL
       
        document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }

    window.onload = function() { 
        gameController.getAllGames().then(
            function(response) {gameController.loadGames(response)}
          )
    
          const navImages = document.querySelectorAll('.nav-item');
            for (let i = 0; i < navImages.length; i++) {
                
                navImages[i].addEventListener("click", function() {
                Array.from(navImages, navImage => navImage.classList.remove('current'));
                navImages[i].classList.add('current');
                });
            }

        }    

      function processReceivedData (data) {
        usersession.push(data);
    }
    