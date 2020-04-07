const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;

exports.postUser = async function(user){
    await client.connect();
    console.log("Connected correctly to database");
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.insertOne(user, null, function (error, results) {
        if(error){
            console.log('Une erreur est survenue ')
            res.send('Une erreur est survenue ')
        } else {
            console.log('user ajoutée');
        }
    })
}

exports.getUsers= async function(){
    console.log("test")
}