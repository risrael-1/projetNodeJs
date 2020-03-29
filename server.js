const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;
// Parsing
app.use(express.json())

// GET method route
app.get('/', function (req, res) {  
    res.send('Hello World')
})



// POST method route
app.post('/notes', async function (req, res) { // A modifier en PUT par la suite !!
  var note = {
   userId: req.body.userId, // a remplacer par la suite !!!
   content: req.body.content,
   createAt: new Date,
   lastUdapted: null
  };    

  await client.connect();
  console.log("Connected correctly to database");
  const db = client.db(dbName);
  const collection = db.collection('notes');
  collection.insertOne(note, null, function (error, results) {
    if(error){
      console.log('Une erreur est survenue ')
      res.send('Une erreur est survenue ')
    } else {
      console.log('note ajoutée');
      res.send('note ajoutée');
    }
  })
  
})

app.get('/notes/all', async function (req, res) {           
    

      try {
        await client.connect();
        console.log("Connected correctly to database");

        const db = client.db(dbName);
       

        // Get the collection
        const col = db.collection('notes');
        // Get the documents that match the query
        const allNotes = await col.find().toArray();
        res.send(allNotes);
        
      } catch (err) {
        console.log(err.stack);
        console.log("fail to connect to database");

      }
      // Close connection
      client.close();

});

app.patch('/notes/:id', async function (req, res) { //besoin de la fonction de recherche user pour completer la fonction corecgtement (recupération de l'existant et remplacement si différent))
  await client.connect();
  console.log("Connected correctly to database");
  const db = client.db(dbName);
  const collection = db.collection('notes');
  var objectId = new MongoObjectID(req.params._id);
  console.log(objectId)
  collection.updateOne(
    {_id: objectId},
    {$set : {content: req.body.content, lastUdapted: new Date}}
  )
  res.send('note modifiée')
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('This API is listening on PORT ->', PORT)
})