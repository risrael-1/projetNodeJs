var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;



router.patch('/notes/:id', async function (req, res) { //besoin de la fonction de recherche user pour completer la fonction corecgtement (recupération de l'existant et remplacement si différent))
await client.connect();
console.log("Connected correctly to database");
const db = client.db(dbName);
const collection = db.collection('notes');

var objectId = new MongoObjectID(req.params._id);
console.log(objectId)
collection.updateOne(//objectId
    {_id: '5e8c551b6225ec0cd0e0ada8'},
    {$set : {content: req.body.content, lastUdapted: new Date}}
)
client.close();
res.render('modify_note', {
    title : '5e8c551b6225ec0cd0e0ada8',
    
  });
});

module.exports = router;