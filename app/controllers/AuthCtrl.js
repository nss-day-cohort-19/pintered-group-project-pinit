"use strict";

//login, logout, register, loginGoogle, clever conditional, authfactory
app.controller("AuthCtrl", function ($scope, $window, AuthFactory, $location) {

  console.log("AuthCtrl is loaded");
  $scope.account = {
    email: "",
    password: ""
  };
//change below with $window.location also, remove scope from logout
//logout has no scope applied since it is only called internally
  let logout = () => {
    console.log("logout clicked");
    AuthFactory.logoutUser()
      .then(function (data) {
        console.log("logged out?", data);
        //location is a service within angular
        $window.location.url = ("#!/login");
      }, function (error) {
        console.log("error occured on logout");
      });
  };

  //when first loaded, make sure no one is logged in
  if (AuthFactory.isAuthenticated()) {
    logout();
  }

  $scope.register = (registerUser) => {
    console.log("you clicked register");
    AuthFactory.createUser(registerUser)
      .then((userData) => {
        console.log("UserCtrl newUser:", userData);
        //$location.path("/alllPins");
        logMeIn(registerUser);
      }, (error) => {
        console.log("Error creating user:", error);
      });
  };


let logMeIn = function(loginStuff){
    //console.log("what is loginStuff", loginStuff);
  AuthFactory.authenticate(loginStuff)
  .then(function(didLogin){
      $scope.login = {};
      $scope.register = {};
      $location.url("/allPins");
      console.log("user", didLogin, "logged in");
      console.log("location", $location);
      $scope.$apply();
    });
};
  $scope.login = () => {
    console.log("you clicked login");
    AuthFactory
      .loginUser($scope.account)
      .then(() => {
        // $scope.isLoggedIn = true;
        // console.log("UserCtrl: user is loggedIn", $scope.isLoggedIn );
        // $scope.$apply();
        $window.location.href = "#!/allPins";
      });
  };


  $scope.loginUser = function(loginNewUser){
    logMeIn(loginNewUser);
  };


  $scope.loginGoogle = () => {
    console.log("you clicked login with Google");
    AuthFactory.authWithProvider()
      .then(function (result) {
        var user = result.user.uid;
        console.log("logged in user:", user);
        //Once logged in, go to another view
        $location.path("/allPins");
        $scope.$apply();
      }).catch(function (error) {
        // Handle the Errors.
        console.log("error with google login", error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
});
