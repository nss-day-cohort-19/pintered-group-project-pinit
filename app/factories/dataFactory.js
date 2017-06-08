"use strict";

app.factory("DataFactory", function($q, $http, fbcreds) {

    const deleteBoard = (boardId) => {
    	console.log("boardId within deleteBoard", boardId);
        return $q((resolve, reject) => {
            $http.delete(`${fbcreds.databaseURL}/boards/${boardId}.json?`)
            .then((response) => {
                resolve(response);
            })
            .catch((response) => {
                reject(response);
            });
        });
    };

    const newProfile = (data) => {
        let friends = ["none"];
        let profile = {
            uid: data.uid,
            photo: data.photoURL,
            email: data.email,
            name: data.displayName,
            friends: friends
        };
        let obj = JSON.stringify(profile);
        return $q((resolve, reject) => {
            $http.put(`${fbcreds.databaseURL}/profiles/${data.uid}.json`, obj)
            .then((response) => {})
            .catch((error) => {});
        });
    };

    const getProfile = (data) => {
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/profiles/${data.uid}.json`)
            .then((response) => {
                console.log(response);
                if(response.data === null) {
                    newProfile(data);
                } else {
                    console.log("already in our base");
                }
                resolve(response);
            }).catch((error) => {
                console.log(error, "erro");
            });
        });
    };

    const editProfile = (uid, obj) => {
        return $q( (resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.patch(`${fbcreds.databaseURL}/profiles/${uid}.json`, newObj)
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getProfiles = () => {
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/profiles.json`)
            .then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log(error);
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


    const getBoards = ( user ) => {
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user}"`)
            .then( (boardsObj) => {
              let boards = [];
              let boardCollection = boardsObj.data;
              Object.keys(boardCollection).forEach((key) => {
                boardCollection[key].id = key;
                boards.push(boardCollection[key]);
              });
              resolve(boards);
            }).catch((error) => {
                reject(error);
            });
        });
    };

	const makePin = (  newObj ) => {
        return $q( (resolve, reject) => {
          let object = JSON.stringify(newObj);
          $http.post(`${fbcreds.databaseURL}/pins.json`, object)
          .then (resolve)
          .catch( reject);
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
    let pins = [];
    return $q( (resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/pins.json`)
      .then( (pinObj) => {
        let pinCollection = pinObj.data;
        Object.keys(pinCollection).forEach((key)=>{
          pinCollection[key].id= key;
          pins.push(pinCollection[key]);
        });
        resolve(pins);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

    //gets a single pin on a board
    const getPin = (pinID) => {
        console.log("pinID is", pinID);
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/pins/${pinID}.json`)
                .then((pinObj) => {
                    resolve(pinObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const removePin = (pinID) => {
    	console.log("removePin has been clicked");
    	console.log("pinID in DataFactory", pinID);
        return $q((resolve, reject) => {
        	console.log("in the removePin promise");
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
                    let board = boardObj.data;
                    resolve(board);
                })
                .catch((error) => {
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
        makeBoard,
        getBoard,
        editBoard,
        getBoardPins,
        getProfile,
        getProfiles,
        editProfile
    };
});
