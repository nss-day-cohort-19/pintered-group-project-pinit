"use strict";

app.controller("PinFormCtrl", function($scope, DataFactory, $location, $routeParams, $window, AuthFactory){

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

  $scope.temp = "";
  if($routeParams.pinId) {
    DataFactory.getPin($routeParams.pinId)
    .then( (stuff) => {
      $scope.pin = stuff;
      console.log("what is stuff", stuff);
      console.log("and the scope of stuff is", $scope.pin);
      $scope.pin.id = $routeParams.pinId;
    });
  }
  function populateBoards( user ) {
    DataFactory.getBoards( user )
    .then( (data) => {
      $scope.boards = data;
    });
  }
  populateBoards( user );

  $scope.newBoard = (event) => {
    if(event.keyCode === 13){
      $scope.boardName = $scope.temp;
      DataFactory.makeBoard({title: $scope.temp})
      .then( (response) => {
        $scope.pin.board_id = response.data.name;
        populateBoards();
      });
    }
  };
  
  $scope.addBoard = (boardId, boardTitle) => {
      $scope.pin.board_id = boardId;
      $scope.boardName = boardTitle;
  };

  $scope.submitPin = function (  ) {

    DataFactory.makePin( $scope.pin)
    .then(()=>{
      $window.location.url= "#!/allPins";
    })
    .then( (data)=>{
      $location.path("/boards");
    });
  
  };

});


