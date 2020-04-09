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
    res.send('Hello Student')
})

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('This API is listening on PORT ->', PORT)
})

