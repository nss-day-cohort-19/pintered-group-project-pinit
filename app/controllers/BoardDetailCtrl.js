"use strict";

app.controller("BoardDetailCtrl", function($scope, DataFactory, $routeParams,$window){

	$scope.getBoardPins = () => {
		Promise.all([DataFactory.getBoardPins($routeParams.boardId), DataFactory.getBoard($routeParams.boardId)])
		.then( values => {
			console.log("values", values);
			$scope.pins = values[0];
			$scope.boardName = values[1].title;
			console.log("$scope.pins", $scope.pins);
			console.log("$scope.boardName", $scope.boardName);
			$scope.$apply();
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
            $scope.getBoards();
        });
    };

    $scope.getBoardPins();


});
