"use strict";

app.controller("PinFormCtrl", function($scope, DataFactory, $location, $routeParams, $window){
  $scope.pin = {
  	uid:"",
    url: "",
    name: "",
    description: "",
    user_text: "",
    board_id:"",
    tags:""
  };
console.log("routeParams.pinid is", $routeParams.pinId);
  DataFactory.getPin($routeParams.pinId)
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

  $scope.submitPin = function () {

    console.log("$scope.pin", $scope.pin);
    DataFactory.makePin($scope.pin)
    .then(()=>{
      console.log("$scope.pin", $scope.pin);
      $window.location.url= "#!/allPins"
    })
    .then( (data)=>{
      $location.path("/allPins");
    });
  
  };

});


