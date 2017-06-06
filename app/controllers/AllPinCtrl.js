"use strict";

app.controller("AllPinCtrl", function($scope, DataFactory){

$scope.getPins= function(){
        DataFactory.getPins()
            .then(function(data){
            let x= [];
            let arryId= Object.keys(data);
            arryId.forEach(function(key){
                x.push(data[key]);
            });
                $scope.pins=x;
                console.log("data is", $scope.pins);
        });
    };
    $scope.getPins();
});
