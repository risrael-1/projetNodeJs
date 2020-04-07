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



router.post('/', async function(req, res, next) {
    var pass = req.body.password
    var username = req.body.firstname
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(pass, salt)

    var auth = {
     firstname: username,
     password: hash
    };

    if (pass < 4){
        res.status(400).send('Le mot de passe doit contenir au moins 4 caractères')
    }
    else if (username < 2 ){
        res.status(400).send('Votre identifiant doit contenir entre 2 et 20 caractères')
    }
    else{
        await client.connect();
        console.log("Connected correctly to database");
        const db = client.db(dbName);
        const col = db.collection('users');
        const allUsers = await col.find().toArray();
        allUsers.forEach(async function(i, obj) {
            if (i.firstname === req.body.user){
                res.status(400).send("Cet identifiant est déjà associé à un compte")
            }
             else {                
                userFunc.postUser(auth)
                var token = jwt.sign({auth}, "secret", { expiresIn: '24h' })
                    res.json({
                        token
                    });
                // res.render('auth', { user : req.body.user, 
                //     password : hash });
                // }
            // })
            }
        })
    }
});

router.delete('/delete/:username', (req, res) => {
    const { username } = req.params;
    db.collection('username').findOneAndDelete({username: username}, 
    (err, result) => {
    if (err) return res.send(500, err)
    console.log('Ok');
    res.redirect('/');
    });
});

module.exports = router;
