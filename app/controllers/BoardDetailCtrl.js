"use strict";

app.controller("BoardDetailCtrl", function($scope, DataFactory, $routeParams){

	// console.log("$scope", $scope);
	console.log("$routeParams", $routeParams.boardId);
	DataFactory.getBoardPins( $routeParams.boardId )
	.then( (object) => {
		$scope.pins = object;
		$scope.boardName = object[0].boards;
		console.log("$scope.pins", $scope.pins);
	});

});