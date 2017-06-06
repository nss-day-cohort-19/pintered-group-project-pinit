"use strict";

app.controller("BoardDetailCtrl", function($scope, DataFactory){

	// console.log("$scope", $scope);

	DataFactory.getBoardPins( "-Kly51h5kVTjUMoMLJNX" )
	.then( (object) => {
		$scope.pins = object;
		$scope.boardName = object[0].boards;
		console.log("$scope.pins", $scope.pins);
	});

});