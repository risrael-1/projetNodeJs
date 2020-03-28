const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Parsing
app.use(express.json())

// GET method route
app.get('/', function (req, res) {  
    res.send('Hello World')
})


// POST method route
app.post('/notes', async function (req, res) { 
  var note = {
   notes: req.body.notes,
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

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('This API is listening on PORT ->', PORT)
})
