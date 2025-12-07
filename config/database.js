const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')
const url =  "mongodb+srv://Micro:ZBiIWpoYWny2VrHH@cluster0.nvb9oru.mongodb.net/?appName=Cluster0";
const client = new MongoClient(url);
class estDbConnection {       
    constructor(dbName,collectionName) {
        try {
             //connect to the server (mongodb server)
             client.connect();
             //sellect the specific database we want to deal with
             let db = client.db(dbName)
             //sellectig the collection we want
             let collection = db.collection(collectionName);
             this.dbCollection = collection;
        console.log("Database connection established successfuly");
        db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
    catch (error) {
        
        console.warn(error);
    }
    }
}

 module.exports = estDbConnection;

