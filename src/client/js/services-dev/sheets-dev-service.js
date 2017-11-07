/**
 * This module exports the SheetsService object as a singleton.
 *
 * @author {@link https://github.com/j-rewerts|Jared Rewerts}
 * @module
 */


var Provoke = require('../util/provoke.js');
var Promise = require('promise');
var gOAuthService = new (require('./google-oauth-service'))();

/**
 * Handles operations related to getting Sheet names.
 *
 * @constructor
 */
var SheetsService = function() {

  var self = this;

  //**** private functions ****//

  this.init_ = function() {
    
  };

  var _getTestSheetId;
  this.getTestSheetId = function() {
    if (!_getTestSheetId) {
      _getTestSheetId = new Promise((resolve, reject) => {
        $.getJSON("/appsettings-dev.json", function(json) {
          resolve(json.testSheet.id);
        }, function(err) {
          reject(err);
        });
      });
    }
    return _getTestSheetId;
  };

  //**** public functions ****//

  /**
   * Gets all Sheet names.
   *
   * @return {Promise} A Promise.
   */
  this.get = function() {
    return new Promise(function(resolve, reject) {
      gOAuthService.getSheetsApi().then(function(sheets) {
        // sheets is a v4 Google API thing: https://developers.google.com/sheets/api/quickstart/js

        self.getTestSheetId().then(function(sheetId) {
          sheets.spreadsheets.get({
            spreadsheetId: sheetId
          }).then(function(response) {
            var sheetNames = response.result.sheets.map(x => {
              return x.properties.title;
            });
            resolve(sheetNames);
          }, function(err) {
            reject({ 
              message: "Unable to get sheet data",
              error: err
            });
          });
        }, function(getTestSheetIdError) {
          reject({
            message: "Unable to get test sheet id",
            error: getTestSheetIdError
          });
        });
      }, function(getSheetsApiError) {
        reject({
          message: "Unable to load Sheets API",
          error: getSheetsApiError
        });
      });
    });
  };

  self.init_();
};


/** */
module.exports = SheetsService;
