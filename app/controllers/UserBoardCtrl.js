"use strict";

app.controller("UserBoardCtrl", function($scope, DataFactory, AuthFactory){
    let user = AuthFactory.getUser();
    user = "";

    $scope.getBoards = () => {
        DataFactory.getBoards(user)
        .then( (boards) => {
            $scope.userBoards = boards.data;
            console.log($scope.userBoards);
            // for(x in $scope.boards){
            //     DataFactory.getPins(x)
            //     .then( (pins) => {
            //         $scope.boards.x = pins.data;
            //     });
            // }
        });
    };

    $scope.removeBoard = (boardId) => {
        DataFactory.deleteBoard(boardId)
        .then( (response) => {
            $scope.getBoards(user);
        });
    };

    $scope.getBoards();
});

