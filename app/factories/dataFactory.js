"use strict";

app.factory("DataFactory", function($q, $http, fbcreds) {

    const getBoards = (user) => {
        let boards = [];
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user}`)
            .then((boardsObj) => {
                let boardsCollection = boardsObj.data;
                Object.keys(boardsCollection).forEach((key) => {
                    boardsCollection[key].id = key;
                    boards.push(boardsCollection[key]);
                });
                resolve(boards);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const deleteBoard = (boardId) => {
        return $q((resolve, reject) => {
            $http.delete(`${fbcreds.databaseURL}/boards/${boardId}.json?`)
            .then( (response) => {
                resolve(response);
            }).catch( (response) => {
                reject(response);
            });
        });
    };
});