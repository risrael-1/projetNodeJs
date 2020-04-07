var express = require('express');
var router = express.Router();


const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;


/* 
GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inscription' });
});




router.get('/notes/all', async function (req, res) {           
  try {
      await client.connect();
      console.log("Connected correctly to database");

      const db = client.db(dbName);
      

      // Get the collection
      const col = db.collection('notes');
      // Get the documents that match the query
      const allNotes = await col.find().toArray();
      client.close();
      res.send(allNotes);
      
  } catch (err) {
      console.log("note is hit")
      console.log(err.stack);
      console.log("fail to connect to database");

  }
  // Close connection
});





module.exports = router;
