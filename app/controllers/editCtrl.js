"use strict";

app.controller('editCtrl', function($scope, $routeParams, DataFactory, $location, $window) {
  
  $scope.pin = {
  	uid:"",
    url: "",
    id: "",
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

  $scope.submitPin = function() {
    // stuff goes here
    DataFactory.editPin($routeParams.pinId, $scope.pin)
    .then((event)=>{
      $window.location.url= "#!/boards/:boardId";
    }) 
    .then( (data)=>{
      $location.path("/boards/:boardId");
    });
  };
});

