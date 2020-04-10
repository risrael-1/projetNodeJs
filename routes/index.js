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
  res.json('Hello world');
});


var userFunc = require('../controller/user');

const bcrypt = require('bcryptjs')


// router.post('/signin', async function(req, res, next) {
//   await client.connect();
//   console.log("Connected correctly to database");
//   const db = client.db(dbName);
//   const col = db.collection('users');
//   const allUsers = await col.findOne({"username": username});
//   allUsers.forEach(async function(i, obj) {
//       passwordDb = i.password
//       decrypt = await bcrypt.compare(req.body.password, passwordDb)
//       if (i.username === req.body.username && decrypt === true){
//           id = i._id.toString()
//           token  = jwt.sign({user: i._id.toString()+i.username + i.password}, 'secretkey', { expiresIn: '24h' })
//               res.json({
//                   token,
//                   id
//               })
//       }
//       else {
//           console.log('Utilisateur ou mot de passe incorrecte')
//       }
//   });
// })


module.exports = router;
