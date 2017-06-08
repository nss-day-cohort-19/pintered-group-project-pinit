"use strict";

app.controller("BoardDetailCtrl", function($scope, DataFactory, $routeParams, $location){

	$scope.getBoardPins = () => {
		DataFactory.getBoardPins($routeParams.boardId)
		.then( (object) => {
			console.log("object in getBoardPins", object);
			$scope.pins = object;
			$scope.boardId = $routeParams.boardId;
			$scope.boardName = object[0].boards;
			console.log("$scope.pins", $scope.pins);
		});
    };

	$scope.removePin = function (pinID) {
    // remove a task
    console.log("pinID", pinID);
    DataFactory.removePin( pinID )
    .then( () => {
      $scope.getBoardPins($routeParams.boardId);
    });
  };

  $scope.removeBoard = () => {
        DataFactory.deleteBoard($routeParams.boardId)
        .then( (response) => {
            $location.path("/boards");
        })
        ;
    };



  $scope.getBoardPins();

});
