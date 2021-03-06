"use strict";

app.controller("PinCtrl", function($scope, DataFactory, $location, $routeParams, $window, AuthFactory){

  let user = AuthFactory.getUser();

  $scope.pin = {
    uid: user,
    url: "",
    name: "",
    description: "",
    user_text: "",
    board_id:"",
    tags:""
  };
  
console.log("routeParams.pinid is", $routeParams.itemId);
  DataFactory.getPin($routeParams.itemId)
  .then( (stuff) => {
    $scope.pin = stuff;
    console.log("what is stuff", stuff);
    console.log("and the scope of stuff is", $scope.pin);
    $scope.pin.id = $routeParams.pinId;
  });

  DataFactory.getBoards()
  .then ( (data) => {
    console.log("data", data);
    $scope.boards = data;
  });


});
