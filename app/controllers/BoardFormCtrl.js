"use strict";

app.controller("BoardFormCtrl", function($scope, DataFactory, $location, AuthFactory){

	let user = AuthFactory.getUser();
    $scope.user = user;

	 $scope.board = {
	 	title: "",
	 	description: "",
	 	uid: user
	 };

 	$scope.makeBoard = ( uid ) => {
 		console.log("$scope.board", $scope.board);
 		DataFactory.makeBoard( $scope.board )
 		.then( (data) => {
 			$location.path("/boards");
 		});
 	};

});