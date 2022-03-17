var app = angular.module("myApp", ["ngRoute"]);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "section/home.html",
        })
        .when("/games", {
            templateUrl : "section/games.html"
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