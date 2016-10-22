"use strict";
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

const initialTweets = require("./tweets"); //gets philosophy tweets from tweets.json

const db = { tweets: initialTweets }; //creates database with philosophy tweets

const dbMethods = {

  saveTweet: (data) => {
    MongoClient.connect(MONGODB_URI, function (err, db){
      let collection = db.collection("tweets");
      collection.insert(data);
    });
    return true;
  },

  getTweets: (cb) => {

    MongoClient.connect(MONGODB_URI, (err, db) => {
      if (err){
        console.log(err);
      }

      let final = db.collection("tweets");

      final.find().toArray((err, results)=> {
        if (err){
          console.log(err);
        }
        cb(results.sort(function(a, b) {
          return a.created_at - b.created_at
        }));
      });
    });
  }
}

module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
