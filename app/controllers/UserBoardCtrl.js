 "use strict";

app.controller("UserBoardCtrl", function($scope, DataFactory, AuthFactory, SearchTermData){
    let user = AuthFactory.getUser();
    // let photo = AuthFactory.getUserPhoto();

    DataFactory.getProfile({uid: user})
    .then( stuff => {
        console.log("data", stuff.data);
        $scope.uid = stuff.data.uid;
        $scope.photo = stuff.data.photo;
    });
    // console.log("userData", userData.$$state.value);
    // $scope.uid = userData.uid;
    // $scope.searchText = SearchTermData;
    // $scope.photo = userData.photo;

    console.log("$scope.uid", $scope.uid);
    console.log("$scope.photo", $scope.photo);
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
