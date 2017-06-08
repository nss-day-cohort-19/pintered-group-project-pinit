"use strict";

//login, logout, register, loginGoogle, clever conditional, authfactory
app.controller("AuthCtrl", function ($scope, $window, AuthFactory, $location, DataFactory) {

  $scope.account = {
    email: "",
    password: ""
  };
//change below with $window.location also, remove scope from logout
//logout has no scope applied since it is only called internally
  let logout = () => {
    AuthFactory.logoutUser()
      .then(function (data) {
        //location is a service within angular
        $window.location.url = ("#!/login");
      }, function (error) {
      });
  };

  //when first loaded, make sure no one is logged in
  if (AuthFactory.isAuthenticated()) {
    logout();
  }

  $scope.register = (registerUser) => {
    AuthFactory.createUser(registerUser)
      .then((userData) => {
        //$location.path("/alllPins");
        logMeIn(registerUser);
      }, (error) => {
      });
  };


let logMeIn = function(loginStuff){
  AuthFactory.authenticate(loginStuff)
  .then(function(didLogin){
      $scope.login = {};
      $scope.register = {};
      $location.url("/allPins");
      console.log(didLogin, "didLogin");
      DataFactory.getProfile(didLogin);
      $scope.$apply();
    });
};
  $scope.login = () => {
    AuthFactory
      .loginUser($scope.account)
      .then(() => {
        // $scope.isLoggedIn = true;
        // $scope.$apply();
        $window.location.href = "#!/allPins";
      });
  };


  $scope.loginUser = function(loginNewUser){
    logMeIn(loginNewUser);
  };


  $scope.loginGoogle = () => {
    AuthFactory.authWithProvider()
      .then(function (result) {
        var user = result.user.uid;
        //Once logged in, go to another view
        $location.path("/allPins");
        console.log(result, "result");
        DataFactory.getProfile(result.user);
        $scope.$apply();
      }).catch(function (error) {
        // Handle the Errors.
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
