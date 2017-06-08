"use strict";

app.controller("ProfileFormCtrl", function($scope, DataFactory, $location, $routeParams, $window, AuthFactory){

  let user = AuthFactory.getUser();
  
  $routeParams.userId = user;

  $scope.profile = {
      uid: user,
      photo: "",
      email: "",
      name: ""
    };

  DataFactory.getProfile(user);

});