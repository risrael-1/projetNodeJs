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
    res.render('authentification', { title: 'test' });
  });
  
router.post('/', async function(req, res, next) {
        await client.connect();
        console.log("Connected correctly to database");
        const db = client.db(dbName);
        const col = db.collection('users');
        const allUsers = await col.find().toArray();
        allUsers.forEach(async function(i, obj) {
            passwordDb = i.password
            decrypt = await bcrypt.compare(req.body.password, passwordDb)
            if (i.firstname === req.body.user && decrypt === true){
                jwt.sign({user: i._id.toString()+i.firstname + i.password}, 'secretkey', { expiresIn: '24h' }, (err, token) => {
                    res.json({
                        token
                    })
                })
            }
            else {
                console.log('Utilisateur ou mot de passe incorrecte')
            }
        });
})
  module.exports = router;
