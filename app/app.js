"use strict";

const app = angular.module("PinItApp", ["ngRoute"]);

let isAuth= (AuthFactory) => {new Promise ( (resolve,reject) =>{
    AuthFactory.isAuthenticated()
    .then((userExists)=>{
        if(userExists){
            console.log("Authenticated, go ahead");
            resolve();
        } else{
            console.log("Authentication rejected");
            reject();
            }
        });
    });
};



app.config(($routeProvider)=>{
    $routeProvider
    .when("/",{
        templateUrl: "partials/allPins.html",
        controller: "AllPinCtrl",
        resolve: {isAuth}
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
        controller: "AllPinCtrl",
        resolve:{isAuth}
    })
    .when("/newPin",{
        templateUrl: "partials/pinForm.html",
        controller: "PinFormCtrl",
        resolve:{isAuth}
    })
    .when("/newBoard",{
        templateUrl: "partials/boardForm.html",
        controller: "BoardFormCtrl",       
        resolve:{isAuth}
    })
    .when("/boards",{
        templateUrl: "partials/userBoards.html",
        controller: "UserBoardCtrl",     
        resolve:{isAuth}
    })
    .when("/boards/:boardId", {
        templateUrl: "partials/boardDetail.html",
        controller: "BoardDetailCtrl",        
        resolve:{isAuth}
    })
    .when("/boards/:boardId/edit",{
        templateUrl: "partials/boardForm.html",
        controller: "EditBoardCtrl",
        resolve:{isAuth}
    })
    .when("/boards/:boardId/:pinId",{
        templateUrl: "partials/boardDetail.html",
        controller: "BoardDetailCtrl",
        resolve:{isAuth}
    })   
     .when("/newPinBoard", {
        templateUrl: "partials/newPin.html",
        controller: "BoardPinCtrl",
        resolve:{isAuth}
    })
    .when("/boards/:boardId/:pinId/edit",{
        templateUrl: "partials/pinForm.html",
        controller:  "EditCtrl",
        resolve:{isAuth}
    })
    .when("/editProfile",{
        templateUrl: "partials/profileForm.html",
        controller: "ProfileFormCtrl",
        resolve:{isAuth}
    })
    .when("/:pinId/edit",{
        templateUrl: "partials/pinForm.html",
        controller: "EditCtrl",
        resolve:{isAuth}
    })
    .when("/:pinId",{
        templateUrl: "partials/pin.html",
        controller: "PinCtrl",
        resolve:{isAuth}
    })
    .when("/:pinId/addpin",{
        templateUrl: "partials/pinForm.html",
        controller: "PinFormCtrl",
        resolve:{isAuth}
    })
    .when("/:itemId/pin",{
        templateUrl: "partials/pin.html",
        controller: "PinCtrl",
        resolve:{isAuth}
    })
    .when("/:pinId/addpin",{
        templateUrl: "partials/pinForm.html",
        controller: "PinFormCtrl",
        resolve:{isAuth}
    })
    .when("/friends", {
        templateUrl: "friends.html",
        controller: "FriendCtrl",
        resolve:{isAuth}

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
