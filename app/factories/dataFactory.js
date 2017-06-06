"use strict";

app.factory("DataFactory", function($q, $http, fbcreds) {

  const makeBoard = ( newObj ) => {
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
    makeBoard
  };

});