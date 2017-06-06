"use strict";


app.factory("DataFactory", function($q, $http, fbcreds) {

    const makePin = (newObj) => {
        return $q((resolve, reject) => {
            let object = JSON.stringify(newObj);
            $http.post(`${fbcreds.databaseURL}/pins.json`, object)
                .then((pinID) => {
                    resolve(pinID);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const editPin = (pinID, editedObj) => {
        return $q((resolve, reject) => {
            let newObj = JSON.stringify(editedObj);
            $http.patch(`${fbcreds.databaseURL}/pins/${pinID}.json`, newObj)
                .then((pinObj) => {
                    resolve(pinObj);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getPins = () => {
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/pins.json`)
                .then((pinObj) => {
                    resolve(pinObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const removePin = (pinID) => {
        return $q((resolve, reject) => {
            $http.delete(`${fbcreds.databaseURL}/pins/${pinID}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const makeBoard = (newObj) => {
        return $q((resolve, reject) => {
            let object = JSON.stringify(newObj);
            $http.post(`${fbcreds.databaseURL}/boards.json`, object)
                .then((itemID) => {
                    resolve(itemID);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const editBoard = (boardId, editBoard) => {
        return $q((resolve, reject) => {


            let newBoard = JSON.stringify(
                editBoard);
            $http.patch(`${fbcreds.databaseURL}/boards/${boardId}.json`, newBoard)
                .then((boardObj) => {
                    resolve(boardObj);



                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const getBoard = (boardId) => {
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/boards/${boardId}.json`)
                .then((boardObj) => {
                    resolve(boardObj);
                })
                .catch((error) => {
                    reject(error);
                });

        });
    };
    return {

        makePin,
        editPin,
        getPins,
        removePin,
        makeBoard,
        editBoard,
        getBoard


    };

});
