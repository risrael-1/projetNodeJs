var express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var passToken = process.env.JWT_KEY
var router = express.Router();

router.get('/', async function(req, res, next) {
    res.render('authentification', { title: 'Authentification' });
  });
  
  router.post('/signin', async function(req, res, next) {
    await client.connect();
    console.log("Connected correctly to database");
    const db = client.db(dbName);
    const col = db.collection('users');
    var username = req.body.username;
    var password = req.body.password;
    const userExist = await col.findOne({"username": username});
  
    if(!userExist){
      res.status(403).json('Cet identifiant est inconnu');
    }
    const comparePassword = bcrypt.compareSync(password, userExist.password);
    if(!comparePassword) res.json('identifiant incorrect');
    token  = jwt.sign({userId: userExist._id}, 'secretkey', { expiresIn: '24h' });
    res.status(200).send({token: token, userId: userExist._id});
   
  })
  module.exports = router;
