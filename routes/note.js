var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;


router.post('/notes', async function (req, res) { // A modifier en PUT par la suite !!
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
      //client.close();
      res.send(results.ops);
    }

  })/*
  res.render('modify_note', {
  title : '5e8c551b6225ec0cd0e0ada8',
  id: '5e8c551b6225ec0cd0e0ada8'
});*/
})


router.put('/notes', async function (req, res) { // A modifier en PUT par la suite !!
  var objectId = new MongoObjectID(req.params._id);
  var note = {
    userId: objectId, // a remplacer par la suite !!! En string
    content: req.body.content,
    createAt: new Date,
    lastUdapted: null
  };

  await client.connect();
  console.log("Connected correctly to database");
  const db = client.db(dbName);
  const collection = db.collection('notes');
  try {
    collection.insertOne(note, function (error, results) {
      if(error){
        console.log('Une erreur est survenue ')
        res.send('Une erreur est survenue ')
      } else {
        console.log('note ajoutée');
        //client.close();
        res.send(results.ops);
      }

    })

  }catch {
    res.send('Une erreur est survenue');
  }
})

router.patch('/notes/:id', async function (req, res) { //besoin de la fonction de recherche user pour completer la fonction corecgtement (recupération de l'existant et remplacement si différent))
await client.connect();
console.log("Connected correctly to database");
const db = client.db(dbName);
const collection = db.collection('notes');

var objectId = new MongoObjectID(req.params._id);
console.log(objectId)
collection.updateOne(//objectId
  {_id: objectId},
  {$set : {content: req.body.content, lastUdapted: new Date}}
)
//client.close();
res.send('modification enregistrée')

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


router.post('/notes/:id', async function (req, res){
  var value_user = req.params.id;
  try {
    await client.connect();
    console.log("Connected correctly to database");
    const db = client.db(dbName);
    const col = db.collection('notes');
    const docs = await col.find({ "userId": value_user }).toArray();
    res.json(docs);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/notes/:id', async function (req, res){
  var value_user = new MongoObjectID(req.params.id);
  try {
    await client.connect();
    console.log("Connected correctly to database");
    const db = client.db(dbName);
    const col = db.collection('notes');
    const del = await col.deleteOne({ _id: value_user });

    res.send("Suppression réussi");
  } catch (err) {
    res.json(err);
    res.send("Echec de la suppression");
  }
});


module.exports = router;
