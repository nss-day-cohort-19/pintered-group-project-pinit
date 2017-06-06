"use strict";

app.controller("UserBoardCtrl", function($scope, DataFactory, AuthFactory){
    let user = AuthFactory.getUser();

    $scope.getBoards = () => {
        DataFactory.getBoards(user)
        .then( (boards) => {
            $scope.userBoards = boards.data;
            // for(x in $scope.boards){
            //     DataFactory.getPins(x)
            //     .then( (pins) => {
            //         $scope.boards.x = pins.data;
            //     });
            // }
        });
    };

    $scope.removeBoard = (boardId) => {
        DataFactory.deleteBoard(user, boardId)
        .then( (response) => {
            $scope.getBoards(user);
        });
    };

    $scope.getBoards();
});

