"use strict";

app.controller("BoardPinCtrl", function($scope, DataFactory, $location, $routeParams, $window, AuthFactory){

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

  $scope.submitNewPin = function () {

    console.log("$scope.pin", $scope.pin);
    DataFactory.makePin($scope.pin)
    .then(()=>{
      console.log("$scope.pin", $scope.pin);
      $window.location.url= "#!/boards/:boardId";
    })
    .then( (data)=>{
      $location.path("/boards/:boardId");
    });
  
  };

});
