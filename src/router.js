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
const rewardController = require("../controllers/rewardController");
const { ipcRenderer }= require("electron");
const { shell }= require("electron");

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
        .when("/store", {
          templateUrl : "section/store.html",
          controller: "storeCtrl"
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
            applicationController.getApplications({id_post: id_post, id_user: userSession.id_user})
            .then((res) => {
              if(res[0]){
                popupController.alert("Ya existe una solicitud pendiente");
              }else{
                applicationController.saveApplication({id_post: id_post, id_user: userSession.id_user});     
              }
             
            })  
          };  
    
    }]);

    app.controller('gameCtrl', ['$scope', function($scope) {

        gameController.getAllGames().then(
            function(response){
                $scope.games = response;
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
        for (let i = 0; i < res.length; i++) { // looping over the options
          postController.getPosts({id_post: res[i].id_post}).then(function(response){
            res[i].post = response[0];
              if(i + 1 ==  res.length ){
                $scope.applications = res;
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

    app.controller('storeCtrl', ['$scope', function($scope) {

      rewardController.getAllRewards().then(
        function(response){
            $scope.rewards = response;
            $scope.$applyAsync();
        }
      )
    
      $scope.btnBuy = async function(reward){
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
          items: [
            {
              title: reward.name,
              description: reward.description,
              category_id: "reward",
              quantity: 1,
              unit_price: reward.price
            }
          ]
        };
    
        axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
          }
        })
        .then((res) => {
          shell.openExternal(res.data.init_point)
        })
        .catch(function(error) {
          console.log(error);
        });
    
      };

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