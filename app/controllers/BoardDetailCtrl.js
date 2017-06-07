"use strict";

<<<<<<< HEAD
app.controller("BoardDetailCtrl", function($scope, DataFactory, $routeParams,$window){
=======
app.controller("BoardDetailCtrl", function($scope, DataFactory, $routeParams, $location){

	// console.log("$scope", $scope);
>>>>>>> b31fe62d76f0d1938ee2887b1a690bf483f56c88

	$scope.getBoardPins = () => {
		DataFactory.getBoardPins($routeParams.boardId)
		.then( (object) => {
			$scope.pins = object;
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
