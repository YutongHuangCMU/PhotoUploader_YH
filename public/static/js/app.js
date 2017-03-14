var app = angular.module("photoUploader", ["ngRoute", "ngResource", "ngFileUpload"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./public/views/home.html",
            controller: "homeController"
        })
        .when("/list", {
            templateUrl: "./public/views/list.html",
            controller: "listController"
        });
});