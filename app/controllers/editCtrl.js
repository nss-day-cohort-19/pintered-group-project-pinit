"use strict";

app.controller('EditCtrl', function($scope, $routeParams, DataFactory, $location) {

  $scope.pin = {
  	uid:"",
    url: "",
    name: "",
    description: "",
    user_text: "",
    board_id:"",
    tags:""
  };

	DataFactory.getPin($routeParams.pinId)
	.then( (stuff) => {
		$scope.pin = stuff;
		$scope.pin.id = $routeParams.pinId;
	});

  $scope.submitPin = function() {
    // stuff goes here
    DataFactory.editPin($routeParams.pinId, $scope.pin)
    .then( (response) => {
    	$location.path("/");
    });
    console.log("pin", $scope.pin);
    console.log("You clicked the edit pin button!");
  };
});

