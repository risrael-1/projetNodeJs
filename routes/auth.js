var express = require('express');
var router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var passToken = process.env.JWT_KEY
var userFunc = require('../controller/user');
const MongoClient = require('mongodb').MongoClient;
const dbName = 'notes-api';
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjectID = require('mongodb').ObjectID;


/* GET users listing. */
router.get('/auth', function(req, res, next) {
  res.render('index', { title: 'test' });
});



router.post('/signup', async function(req, res, next) {
    var password = req.body.password;
    var username = req.body.username;
    console.log('pass = '+password)
   // var my_regex = new RegExp("^((?=.*[a-z])(?=.{2,20})");
  
  console.log('test =  '+ typeof password)
    
  /*
    if(!/[a-z]/.test(this.value))
              return false;
  res.send('ok')*/
  
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
  
    var user = {
      username: username,
     password: password
    };
    
    //var pass = user.password.toString();
    
  
        await client.connect();
        console.log("Connected correctly to database");
        const db = client.db(dbName);
        const col = db.collection('users');
        //const allUsers = await col.find().toArray();
        if(username < 2 && username > 20){
            res.json('Votre identifiant doit contenir entre 2 et 20 caractères')
        }
        if(password < 4){
          res.json('Le mot de passe doit contenir au moins 4 caractères')
        }
  
        const userExist = await col.findOne({"username": username});
        if(userExist){
          res.json('Cet identifiant est déjà associé à un compte');
        }else {
          col.insertOne(user, function (error, results) {
            if(error){
              res.json(err)
            } else {
              console.log('user ajoutée');
              //client.close();
              res.json(results.ops);
            }
        
          })
        }
  
    
  });

router.delete('/delete/:username', (req, res) => {
    const { username } = req.params;
    db.collection('username').findOneAndDelete({username: username}, 
    (err, result) => {
        if (err) return res.json(500, err)
        console.log('Ok');
        res.redirect('/');
    });
});

module.exports = router;
