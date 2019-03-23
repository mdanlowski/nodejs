var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db = new Db('todoExpl', new Server('localhost', 27017));
// Establish connection to db
db.open(function(err, db) {
  collection.find({}, {explain:true}).toArray(function(err, docs) {
    assert.equal(null, err);
    assert.equal(1, docs.length);

    db.close();
  });
});