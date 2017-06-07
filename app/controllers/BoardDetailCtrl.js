"use strict";

app.controller("BoardDetailCtrl", function($scope, DataFactory, $routeParams){

	// console.log("$scope", $scope);
	console.log("$routeParams", $routeParams.boardId);
	$scope.getBoardPins = (boardId) => {
		DataFactory.getBoardPins( $routeParams.boardId )
		.then( (object) => {
			$scope.pins = object;
			// $scope.boardName = object[0].name;
			console.log("$scope.pins", $scope.pins);
		});
	};

	// $scope.getBoardPins($routeParams.boardId);

	$scope.getBoardName = ( boardId ) => {
		DataFactory.getBoard(boardId)
		.then ( (newObject) => {
			console.log("newObject", newObject);
			// return object.title;
		});
	};

	Promise.all([DataFactory.getBoardPins($routeParams.boardId), DataFactory.getBoard($routeParams.boardId)])
	.then( values => {
		console.log("values", values);
		$scope.pins = values[0];
		$scope.boardName = values[1].title;
		console.log("$scope.pins", $scope.pins);
		console.log("$scope.boardName", $scope.boardName);
		$scope.$apply();
	});

});