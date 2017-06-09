"use strict";

app.controller('FriendCtrl', function($scope, $routeParams, DataFactory, $location, $window, AuthFactory) {
    let user = AuthFactory.getUser();

    let populatePeople = () => {
        $scope.friendList = [];
        $scope.nonFriends = [];
        DataFactory.getProfiles()
        .then((data) => {
            let me = data[user];
            console.log("user", user);
            console.log(data, "data", me, "me");
            for(let people in data) {
                try {
                    let ding = me.friends[people];
                    if(ding == " ") {
                        $scope.friendList.push(data[people]);
                    } else {
                        $scope.nonFriends.push(data[people]);
                    }
                } catch (e) {
                    $scope.nonFriends.push(data[people]);
                }
                console.log($scope.nonFriends, "non");
            } 
        });
    };
    
    $scope.addFriend = (id) => {
        DataFactory.addFriend(user, id)
        .then( response => {
            console.log("yeah add");
            populatePeople();
        }).catch( error => {
            console.log(error, "error");
        });
    };

    $scope.removeFriend = id => {
        DataFactory.removeFriend(user, id)
        .then( response => {
            console.log("yeah remove");
            populatePeople();
        }).catch( error => {
            console.log(error, "error");
        });
    };

    populatePeople();
});

// if(me.friends){
//                 for(let friends in me.friends) {
//                     if(data[friends]) {
//                         friendList.push(data[friends]);
//                     }
//                 }
//             }