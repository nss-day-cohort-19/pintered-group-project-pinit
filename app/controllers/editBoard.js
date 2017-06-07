"use strict";

app.controller('editBoardCtrl', function($scope, $routeParams, DataFactory, $location) {

    $scope.board = {
        title: "",
        description: "",
        uid: ""
    };
    ///boards/:boardId/edit
    DataFactory.getBoard($routeParams.boardId)
        .then((stuff) => {
            $scope.board = stuff.data;
            $scope.board.id = $routeParams.boardId;
            console.log(stuff);

        });

    //use $routeParams to get the board from firebas.
    $scope.makeBoard = function() {
        DataFactory.editBoard($routeParams.boardId, $scope.board)
            .then((response) => {
                $location.path("/boards");

            });
        console.log("You clicked the edit board button!");
    };
});