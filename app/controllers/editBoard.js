"use strict";


app.controller('EditBoardCtrl', function($scope, $routeParams, DataFactory, $location, AuthFactory) {

    let user = AuthFactory.getUser();

    $scope.board = {
        title: "",
        description: "",
        uid: user
    };
    ///boards/:boardId/edit
    DataFactory.getBoard($routeParams.boardId)
        .then((stuff) => {
            $scope.board = stuff;
            //$scope.board.id = $routeParams.boardId;
            //console.log("editBoard control", stuff);

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