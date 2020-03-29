// => pour lancer ce script avec serveur mongodb, taper la commande suivante:
// $ MONGODB_URI=<mon_mot_de_passe> node user.js
// # e.g."mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority"

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI= "mongodb+srv://Arnaud:Arnaud@cluster0-rnqbu.mongodb.net/notes-api?retryWrites=true&w=majority";
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  await client.connect();
  const collection = client.db("notes-api").collection("users");
  // affiche la liste des documents de la collection dates dans la sortie standard
  const users = await collection.find({}).toArray();
  console.log('users:', users)

  await collection.insertOne({ user: new User() });

  await client.close();
})();