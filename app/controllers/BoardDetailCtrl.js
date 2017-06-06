"use strict";

app.controller("BoardDetailCtrl", function($scope, DataFactory){

	// console.log("$scope", $scope);

	DataFactory.getBoardPins( "board1")
	.then( (object) => {
		$scope.pins = object;
		$scope.boardName = object[0].boards;
		console.log("$scope.pins", $scope.pins);
	});

});