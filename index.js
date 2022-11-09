// ACEP is the basic step us
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
//This is very very important to connect database for secure pass and user
require('dotenv').config();
// set the port 5000;
const port = process.env.PORT || 5000;

// Use the middle ware to convert code
app.use(cors());
app.use(express.json());


// Connection Between server site to mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gojv5gq.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});






app.get('/', (req, res) => {
    res.send('API 5000 PORT Running.')
})

app.listen(port, () => {
    console.log(`Makeup Artist runing on ${port}`);
})