'use strict';

app.controller("FriendBoardCtrl", function($scope, DataFactory, SearchTermData, $routeParams){
    let user = $routeParams.friendId;
    $scope.friendName = $routeParams.friendName;
    
    DataFactory.getProfile({uid: user})
    .then( stuff => {
        console.log("data", stuff.data);
        $scope.uid = stuff.data.uid;
        $scope.photo = stuff.data.photo;
    });

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

    $scope.getBoards( user );
});