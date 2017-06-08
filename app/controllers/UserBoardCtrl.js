 "use strict";

app.controller("UserBoardCtrl", function($scope, DataFactory, AuthFactory){
    let user = AuthFactory.getUser();
    let photo = AuthFactory.getUserPhoto();
    $scope.uid = user;
    $scope.photo = photo;
    // user = "";
    console.log("user", user);

    $scope.getBoards = ( uid ) => {
        
        function sortPins(x) {
            DataFactory.getBoardPins($scope.userBoards[x].id)
            .then( (pins) => {
                console.log(pins, "pins");
                if(pins.length !== 0) {
                    for(let y in $scope.userBoards) {
                        if($scope.userBoards[y].id === pins[0].board_id) {
                            $scope.userBoards[y].pins = pins;
                        } 
                    }
                    console.log($scope, "scope");
                }
            });
        }
        
        DataFactory.getBoards( uid )
        .then( (boards) => {
            $scope.userBoards = boards;
            for(let x in $scope.userBoards){
                sortPins(x);
            }
        });
    };

    $scope.removeBoard = (boardId) => {
        DataFactory.deleteBoard(boardId)
        .then( (response) => {
            $scope.getBoards();
        });
    };

    $scope.getBoards( user );
});
