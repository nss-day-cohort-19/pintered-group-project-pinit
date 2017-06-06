"use strict";

app.factory("DataFactory", function($q,$http,fbcreds){

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

	const makePin = ( newObj ) => {
    return $q( (resolve, reject) => {
      let object = JSON.stringify(newObj);
      $http.post(`${fbcreds.databaseURL}/pins.json`, object)
      .then ((pinID) => {
        resolve(pinID);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  
  const editPin = (pinID, editedObj) => {
    return $q( (resolve, reject) => {
      let newObj = JSON.stringify(editedObj);
      $http.patch(`${fbcreds.databaseURL}/pins/${pinID}.json`, newObj)
      .then( (pinObj) => {
        resolve(pinObj);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  //gets all pins, this is visible when you come to page in the beginning
  const getPins = () => {
    return $q( (resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/pins.json`)
      .then( (pinObj) => {
        resolve(pinObj.data);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  //gets a single pin on a board
  const getPin = (pinID) => {
    return $q( (resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/pins/${pinID}.json`)
      .then( (pinObj) => {
        resolve(pinObj.data);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  const removePin = (pinID) => {
    return $q ( (resolve, reject) => {
      $http.delete(`${fbcreds.databaseURL}/pins/${pinID}.json`)
      .then( (response) => {
        resolve(response);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  const makeBoard = (newObj) => {
    return $q( (resolve, reject) => {
      let object = JSON.stringify(newObj);
      $http.post(`${fbcreds.databaseURL}/boards.json`, object)
      .then ( (itemID) => {
        resolve(itemID);

      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  return {
    getBoards,
    deleteBoard,
    makePin,
    editPin,
    getPins,
    getPin,
    removePin,
    makeBoard
  };

});
