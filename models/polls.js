// "use strict";
// var rethinkdb = require('rethinkdb');
// var db = require('./db');
// var async = require('async');
//
// class polls {
//
// }
//
// module.exports = polls;
"use strict";
var rethinkdb = require('rethinkdb');
var db = require('./db');
var async = require('async');

class polls {
  addNewPolls(pollData,callback) {
  }

  votePollOption(pollData,callback) {
  }

  getAllPolls(callback) {
    async.waterfall([
      function(callback) {
        db.connectToDb(function(err,connection) {
          if(err) {
            return callback(true,"Error connecting to database");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.table('poll').run(connection,function(err,cursor) {
          connection.close();
          if(err) {
            return callback(true,"Error fetching polls to database");
          }
          cursor.toArray(function(err, result) {
            if(err) {
              return callback(true,"Error reading cursor");
            }
            callback(null,result);
          });
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }
}

module.exports = polls;
