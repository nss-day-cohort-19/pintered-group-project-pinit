"use strict";

app.controller('FriendCtrl', function($scope, $routeParams, DataFactory, $location, $window, AuthFactory) {
    let user = AuthFactory.getUser();
    $scope.friendList = [];
    $scope.nonFriends = [];
    var me, people;

    let populatePeople = () => {
        $scope.friendList = [];
        $scope.nonFriends = [];
        DataFactory.getProfiles()
        .then((data) => {
            people = data;
            me = data[user];
            console.log(me, "me");
            for(let people in data) {
                console.log(people, "peeps");
                let matched = false;
                for(let fri in me.friends) {
                    if(me.friends[fri] == people) {
                        $scope.friendList.push(data[people]);
                        matched = true;
                    } 
                }
                if(!matched) {
                    $scope.nonFriends.push(data[people]);
                }
            } 
        });
    };
    
    $scope.addFriend = (id) => {
        console.log(me.friends, "my friends");
        me.friends.push(id);
        DataFactory.editProfile(user, {friends: me.friends})
        .then( response => {
            populatePeople();
        }).catch( error => {
            console.log(error, "error");
        });
    };

    $scope.removeFriend = id => {

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