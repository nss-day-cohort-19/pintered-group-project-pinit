"use strict";

const app = angular.module("PinItApp", ["ngRoute"]);



app.config(($routeProvider)=>{
    $routeProvider
    .when("/",{
        templateUrl: "partials/allPins.html",
        controller: "AllPinCtrl"
    })
    .when("/login", {
        templateUrl: "partials/login.html",
        controller: "AuthCtrl"
    })
    .when("/logout",{
        templateUrl: "partials/login.html",
        controller: "AuthCtrl"
    })
    .when("/AllPins",{
        templateUrl: "partials/allPins.html",
        controller: "AllPin"
    })
    .when("/newPin",{
        templateUrl: "partials/pinForm.html",
        controller: "PinFormCtrl"
    })
    .when("/newBoard",{
        templateUrl: "partials/boardForm.html",
        controller: "BoardFormCtrl"
    })
    .when("/boards",{
        templateUrl: "partials/userBoards.html",
        controller: "UserBoardCtrl"
    })
    .when("/boards/myBoard", {
        templateUrl: "partials/boardDetail.html",
        controller: "BoardDetailCtrl"
    })
    .when("/boards/:boardId/edit",{
        templateUrl: "partials/boardForm",
        controller: "editCtrl"
    })
    .when("/boards/:boardId/:pinId",{
        templateUrl: "partials/boardDetail.html",
        controller: "BoardDetailCtrl"
    })
    .when("/boards/:boardId/:pinId/edit",{
        templateUrl: "partials/pinForm.html",
        controller:  "editCtrl"
    })
    .otherwise("/");
});

app.run(($location, fbcreds)=>{
   let cred = fbcreds;
   let authConfig = {
    apiKey: cred.apiKey,
    authDomain: cred.authDomain,
    databaseURL: cred.databaseUrl
   };
});
