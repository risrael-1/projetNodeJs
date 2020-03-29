var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/auth', function(req, res, next) {
  res.render('index', { title: 'test' });
});
router.post('/', async function(req, res, next) {
    var pass = req.body.password
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(pass, salt)
    // let compare = await bcrypt.compare(pass, "$2a$10$FcT/6dqAbsWxYarYjKTDTeJ5qM85r9zO9rpZSs5.gjCpufVBJMG/O")
    console.log(hash)
    console.log(compare)
    var auth = {
     firstname: req.body.user,
     password: hash
    };
    res.render('auth', { user : req.body.user, 
    password : hash });
    await client.connect();
    console.log("Connected correctly to database");
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.insertOne(auth, null, function (error, results) {
        if(error){
        console.log('Une erreur est survenue ')
        res.send('Une erreur est survenue ')
        } else {
        console.log('user ajoutée');
        }
  })
  
});

module.exports = router;
