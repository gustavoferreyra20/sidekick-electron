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
        .when("/comments", {
            templateUrl : "section/comments.html"
        })
        .when("/user", {
            templateUrl : "section/user.html"
        })
        .when("/config", {
            templateUrl : "section/config.html"
        });
    });

    app.controller('homeCtrl', ['$scope', function($scope) {

        dynamicallyLoadScript("../Controllers/homeController.js")
    
    }]);

    app.controller('gameCtrl', ['$scope', function($scope) {

        dynamicallyLoadScript("../Controllers/gameController.js")
    
    }]);

    function dynamicallyLoadScript(url) {
        var script = document.createElement("script");  // create a script DOM node
        script.src = url;  // set its src to the provided URL
       
        document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }