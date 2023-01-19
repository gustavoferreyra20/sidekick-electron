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
const applicationController = require("../controllers/applicationController");
const { ipcRenderer }= require("electron");
const { rmSync } = require("original-fs");

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
        .when("/applications", {
            templateUrl : "section/applications.html",
            controller: "applicationCtrl"
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

          postController.getPosts().then(
            function(response){
                postController.loadPosts(response).then(function(posts){
                    $scope.posts = posts;

                    $scope.$applyAsync();
                })
            }
          )
          
          gameController.getOptions(true).then(function(response){
            $scope.gameOptions = response;
            $scope.gameSelected = $scope.gameOptions[0];

            $scope.setPlatforms();
            $scope.$applyAsync();
          });

          modeController.getOptions(true).then(function(response){
            $scope.modeOptions = response;
            $scope.modeSelected = $scope.modeOptions[0];
            
            $scope.$applyAsync();
          });

          $scope.setPlatforms = function(arg = null){
            var game;

            if(arg != null){
              game = (arg.value != 'any') ? arg.value : null;
            }else{
              game = arg;
            }

            platformController.getOptions(game, true).then(function(response){
              $scope.platformOptions = response;
              $scope.platformSelected = $scope.platformOptions[0];
              
              $scope.$applyAsync();
            }); 
           
          }; 
          
          $scope.btnSearchPost = function(game, platform, mode){
            let params = {};

            if(game.value != 'any'){
              params.id_game = game.value;
            }
        
            if(platform.value != 'any'){
              params.id_platform = platform.value;
            }
        
            if(mode.value != 'any'){
              params.id_mode = mode.value;
            }

            postController.getPosts(params).then(
              function(response){
                  postController.loadPosts(response).then(function(response){
                      $scope.posts = response;
                      $scope.$applyAsync();
                  })
              }
            )
           
          };
          
          $scope.btnSubmitApplication = function(id_post){
            applicationController.saveApplication({id_post: id_post, id_user: userSession.id_user});     
          };  
    
    }]);

    app.controller('gameCtrl', ['$scope', function($scope) {

        gameController.getAllGames().then(
            function(response){
                var games = [];

                for (var i=0, n = response.length; i < n; i++) { // looping over the options
                    var game = {
                        img:  response[i].img,
                        name: response[i].name,
                      };

                      games.push(game);
                }

                $scope.games = games;
                $scope.$applyAsync();
            }
        )
    
    }]);

    app.controller('profileCtrl', ['$scope', function($scope) {
        
        userController.getUser({id_user: userSession.id_user}).then(
            function(user) {
                
                reviewController.getAvg({id_user: user[0].id_user}).then(
                    function(response) {

                      var profile = {
                        name: user[0].name,
                        description: user.description,
                        ability: (response[0].abilityScore === undefined ) ? 0 : Math.round(response[0].abilityScore),
                        karma: (response[0].karmaScore === undefined ) ? 0 : Math.round(response[0].karmaScore)
                      };

                      $scope.profile = profile;
                      $scope.$applyAsync();
        
                    }
                  )
            }
          )

        reviewController.getReviews({id_user: userSession.id_user}).then(
          function(reviews){
            $scope.reviews = reviews;
            $scope.$applyAsync();
          }
          )


    
    }]);

    app.controller('configCtrl', ['$scope', function($scope) {

      $scope.btnLogout = function(){
        userController.logout(userSession.token).then(ipcRenderer.invoke("logout"))
       
      };  
    
    }]);

    app.controller('newPCtrl', ['$scope', function($scope) {

      gameController.getOptions(false).then(function(response){
        $scope.gameOptions = response;
        $scope.gameSelected = $scope.gameOptions[0];
        
        $scope.setPlatforms();
        $scope.$applyAsync();
      });

      modeController.getOptions(false).then(function(response){
        $scope.modeOptions = response;
        $scope.modeSelected = $scope.modeOptions[0];
        
        $scope.$applyAsync();
      });

      $scope.setPlatforms = function(arg = null){
        game = (arg != null) ? arg.value : null;

        platformController.getOptions(game, false).then(function(response){
          $scope.platformOptions = response;
          $scope.platformSelected = $scope.platformOptions[0];
          
          $scope.$applyAsync();
        }); 
       
      }; 
    
      $scope.createPost = function(form, game, platform, mode){
       form.game = game;
       form.platform = platform;
       form.mode = mode;
       
       postController.savePost(form);
      };  
    }]);


    app.controller('applicationCtrl', ['$scope', function($scope) {

    showSentApp();

    $scope.showSentApp = function(){showSentApp()};

    $scope.showReceivedApp = function(){showReceivedApp()}; 

    $scope.changeStatus = function(id_application, status){

      applicationController.setStatus(id_application, status)
      .then(showReceivedApp());
    }; 

    function showSentApp(){
      applicationController.getApplications({id_user: userSession.id_user}).then(function(res){
        var app = [];

        for (let i = 0; i < res.length; i++) { // looping over the options
          postController.getPosts({id_post: res[i].id_post}).then(function(response){
            app.push(response[0])
              if(app.length === res.length){
                $scope.applications = app;
                $scope.posts = [];
                $scope.$applyAsync();
              } 
          });       
        }  
    });
    }

    function showReceivedApp(){
      applicationController.getApplicationsByUsersPosts(userSession.id_user).then(function(posts){

        $scope.posts = posts;
        $scope.applications = [];
        $scope.$applyAsync();
      })
    }

    $scope.btnCancelApplication = function(id_post){
      popupController.confirm("Seguro desea eliminar la solicitud?", function (){ (applicationController.removeApplication(id_post, userSession.id_user).then(showSentApp()))})
    }

    $scope.btnDeletePost = function(id_post){
      popupController.confirm("Seguro desea eliminar el post?", function (){ (postController.removePost(id_post).then(showReceivedApp()))})
    }

    }]);

    window.onload = function() { 
  
          const navImages = document.querySelectorAll('.nav-item');
            for (let i = 0; i < navImages.length; i++) {
                
                navImages[i].addEventListener("click", function() {
                Array.from(navImages, navImage => navImage.classList.remove('current'));
                navImages[i].classList.add('current');
                });
            }

        }        