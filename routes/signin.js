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

//export { connected };

router.post('/signin', async function(req, res) {
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
  if(!comparePassword) {
    res.status(403).json('identifiant inconnu');
  } 
  token = jwt.sign({userId: userExist._id}, 'secretkey', { expiresIn: '24h' });
  res.status(200).send({token: token, userId: userExist._id});
  
})

router.post('/connected', async function connected (req,res){
  let token = req.headers['x-access-token'];
  if(!token) {
    return res.status(401).send('Utilisateur non connecté');
  }
    jwt.verify(token, 'secretkey', function (err, results){
      if(err) {
        res.sendStatus(401);
      }

      res.status(200).send(results)
  });
})


module.exports = router;
