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
  $scope.temp = "";

  function populateBoards() {
    DataFactory.getBoards()
    .then( (data) => {
      $scope.boards = data;
    });
  }
  populateBoards();

  $scope.newBoard = (event) => {
    if(event.keyCode === 13){
      $scope.boardName = $scope.temp;
      DataFactory.makeBoard({title: $scope.temp})
      .then( populateBoards);
    }
  };
  
  $scope.addBoard = (boardId, boardTitle) => {
      $scope.pin.board_id = boardId;
      $scope.boardName = boardTitle;
  };

  $scope.submitPin = function () {

    DataFactory.makePin($scope.pin)
    .then(()=>{
      $window.location.url= "#!/allPins";
    })
    .then( (data)=>{
      $location.path("/allPins");
    });
  
  };

});


