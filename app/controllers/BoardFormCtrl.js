"use strict";

app.controller("BoardFormCtrl", function($scope, DataFactory, $location){

 $scope.board = {
 	title: "",
 	description: "",
 	uid: ""
 };

 	$scope.makeBoard = () => {
 		console.log("$scope.board", $scope.board);
 		DataFactory.makeBoard( $scope.board );
 		// .then( (data) => {
 		// 	$location.path("/boards");
 		// });
 	};

});

