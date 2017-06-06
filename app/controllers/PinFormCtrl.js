"use strict";

app.controller("PinFormCtrl", function($scope, DataFactory, $location){
  $scope.pin = {
  	uid:"",
    url: "",
    name: "",
    description: "",
    user_text: "",
    board_id:"",
    tags:""
  };

  DataFactory.getBoards()
  .then ( (data) => {
    console.log("data", data);
    $scope.boards = data;
  });

  $scope.submitPin = function () {

    console.log("$scope.pin", $scope.pin);
    DataFactory.makePin($scope.pin);
    console.log("$scope.pin", $scope.pin);
   
  
  };

});

