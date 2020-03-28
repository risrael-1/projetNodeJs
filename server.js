const fs = require('fs')
const util = require('util')
const express = require('express')
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = 'notes-api';
const COLLECTION_NAME = 'user';

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/user', function (req, res) {
  const user = req.query.user
  if (user) {
    res.send('Bonjour, ' + user + ' !')
  } else {
    res.send('User : ')
    res.send('Password : ')
  }
})

;(async () => {
  console.log(`Connecting to ${DATABASE_NAME}...`)
  const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  await client.connect()
  collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME)
  console.log(`Successfully connected to ${DATABASE_NAME}`)
  app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
  })
  // await client.close() // should be done when the server is going down
})()