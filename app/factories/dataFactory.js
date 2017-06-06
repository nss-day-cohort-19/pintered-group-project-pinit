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

    const getBoardPins = (boardId) => {
        let pins = [];
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/pins.json?orderBy="board_id"&equalTo="${boardId}"`)
            .then((pinsObj) => {
                let pinCollection = pinsObj.data;
                Object.keys(pinCollection).forEach((key) => {
                    pinCollection[key].id = key;
                    pins.push(pinCollection[key]);
                });
                resolve(pins);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getBoards = () => {
        let boards = [];
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/boards.json`)  //?orderBy="uid"&equalTo="${user}"
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
    let x=[];
    return $q( (resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/pins.json`)
      .then( (pinObj) => {
        
        let itemObj= pinObj.data;
        Object.keys(itemObj).forEach((key)=>{
          itemObj[key].id= key;
          x.push(itemObj[key]);
        });
        resolve(pinObj.data);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  const getBoardPins = ( boardID ) => {
    return $q( (resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/pins.json?orderBy="board_id"&equalTo="${boardID}"`)
      .then( (itemObj) => {
        // console.log("itemObj", itemObj);
        let itemsArray = [];
        for (let object in itemObj.data){
          // itemObj.data[object].pinID = object;
          // console.log(itemObj.data[object]);
          itemsArray.push(itemObj.data[object]);
        }
        resolve(itemsArray);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  //gets a single pin on a board
  const getPin = (pinID) => {
    console.log("pinID is", pinID);
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
    getBoardPins,
    getBoards,
    deleteBoard,
    makePin,
    editPin,
    getPins,
    getPin,
    removePin,
    makeBoard,
    getBoardPins
  };

});
