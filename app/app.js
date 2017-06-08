"use strict";

const app = angular.module("PinItApp", ["ngRoute"]);

app.config(($routeProvider)=>{
    $routeProvider
    .when("/",{
        templateUrl: "partials/login.html",
        controller: "AuthCtrl"
    })
    .when("/login", {
        templateUrl: "partials/login.html",
        controller: "AuthCtrl"
    })
    .when("/logout",{
        templateUrl: "partials/login.html",
        controller: "AuthCtrl"
    })
    .when("/allPins",{
        templateUrl: "partials/allPins.html",
        controller: "AllPinCtrl"
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
    .when("/boards/:boardId", {
        templateUrl: "partials/boardDetail.html",
        controller: "BoardDetailCtrl"
    })
    .when("/boards/:boardId/edit",{
        templateUrl: "partials/boardForm",
        controller: "EditBoardCtrl"
    })
    .when("/boards/:boardId/:pinId",{
        templateUrl: "partials/boardDetail.html",
        controller: "BoardDetailCtrl"
    })   
     .when("/newPinBoard", {
        templateUrl: "partials/newPin.html",
        controller: "BoardPinCtrl"
    })
    .when("/boards/:boardId/:pinId/edit",{
        templateUrl: "partials/pinForm.html",
        controller:  "EditCtrl"
    })
    .when("/:pinId/edit",{
        templateUrl: "partials/pinForm.html",
        controller: "EditCtrl"
    })
    .when("/:pinId",{
        templateUrl: "partials/pin.html",
        controller: "PinCtrl"
    })
    .when("/:pinId/addpin",{
        templateUrl: "partials/pinForm.html",
        controller: "PinFormCtrl"
    })
    .when("/:itemId/pin",{
        templateUrl: "partials/pin.html",
        controller: "PinCtrl"
    })
    .when("/:pinId/addpin",{
        templateUrl: "partials/pinForm.html",
        controller: "PinFormCtrl"
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

   firebase.initializeApp(authConfig);
});
