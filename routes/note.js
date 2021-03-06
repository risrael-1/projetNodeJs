var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;


var jwt = require('jsonwebtoken');

router.post('/notes', async function (req, res) { 
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
  })
})
  
  
router.put('/notes', async function (req, res, next) { 
  let token = req.headers['x-access-token'];
  var responseToken;
  if(!token) {
    return res.status(401).send('Utilisateur non connecté');
  }
  jwt.verify(token, 'secretkey', function (err, results){
    if(err) {
      res.status(401).send('Utilisateur non connecté');
    }
    if(!results){
      return res.status(401).send('null');
    }
    //res.status(200).send(results)
    responseToken = results;
  });
  var note = {
    userId: responseToken.userId, // a remplacer par la suite !!! En string
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

router.patch('/notes/:id', async function (req, res) { 
  let token = req.headers['x-access-token'];

  if(!token) {
    return res.status(401).send('Utilisateur non connecté');
  }
  jwt.verify(token, 'secretkey', function (err, results){
    if(err) {
      res.status(401).send('Utilisateur non connecté');
    }
    if(!results){
      return res.status(401).send('null');
    }
    
    //res.status(200).send(results)
  });
  
  await client.connect();
  console.log("Connected correctly to database");
  const db = client.db(dbName);
  const collection = db.collection('notes');
  var objectId = new MongoObjectID(req.params.id);


  console.log(objectId)
  collection.updateOne(
    {"_id": objectId},
    {$set : {content: req.body.content, lastUdapted: new Date}}
  )
  const note = await collection.findOne({"_id": objectId});
  //client.close();
  console.log(note)
  res.status(200).send(note);
});

router.get('/notes/all', async function (req, res) {           
  try {
    await client.connect();
    console.log("Connected correctly to database");
    let token = req.headers['x-access-token'];
    var responseToken;
    if(!token) {
      return res.status(401).send('Utilisateur non connecté');
    }
    jwt.verify(token, 'secretkey', function (err, results){
      if(err) {
        res.status(401).send('Utilisateur non connecté');
      }
      if(!results){
        return res.status(401).send('null');
      }
      //res.status(200).send(results)
      responseToken = results;
    });
 



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
  let token = req.headers['x-access-token'];
  if(!token) {
    return res.status(401).send('Utilisateur non connecté');
  }
  jwt.verify(token, 'secretkey', function (err, results){
    if(err) {
      res.status(401).send('Utilisateur non connecté');
    }
    if(!results){
      return res.status(401).send('null');
    }
    //res.status(200).send(results)
    responseToken = results;
  });
  await client.connect();   
  var value_user = new MongoObjectID(req.params.id); 
  var responseToken;
  const db = client.db(dbName);    
  const col = db.collection('notes');  
  console.log("Connected correctly to database");  
  const note = await col.findOne({"_id": value_user});
  if(!note) {
    return res.status(404).json('Cet identifiant est inconnu');
  }
  if(note.userId === responseToken.userId){
    try {    
      await col.deleteOne({ _id: value_user });    

      res.send("Suppression réussi");    
    } catch (err) {    
    res.json(err);    
    }
  }else {
    res.status(403).send('Accès non autorisé à cette note');
  }


});

  module.exports = router;