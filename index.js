// ACEP is the basic step us
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
//This is very very important to connect database for secure pass and user
require("dotenv").config();

// set the port 5000;
const port = process.env.PORT || 5000;

// Use the middle ware to convert code
app.use(cors());
app.use(express.json());

// Connection Between server site to mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gojv5gq.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const makeupCollection = client.db("makeupArtist").collection("services");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = makeupCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    // app.get('/data', async (req, res) => {
    //     const user = {
    //         title: "Assalamu alaikum.",
    //         name: "Farhana Yesmin",
    //         img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.allrecipes.com%2Frecipe%2F240469%2Fisaacs-carrot-cake%2F&psig=AOvVaw30E2pgKJF_5cnVxFSIRwsx&ust=1668056788169000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIjDqfWpoPsCFQAAAAAdAAAAABAE"
    //     }

    //     const results = await makeupCollection.insertOne(user);
    //     res.send(results);
    // })
  } finally {
  }
}
run().catch((err) => {
  console.error(err.name.bg - red, err.message.bold);
});

app.get("/", (req, res) => {
  res.send("API 5000 PORT Running.");
});

app.listen(port, () => {
  console.log(`Makeup Artist runing on ${port}`);
});

// const express = require('express');
// const cors = require('cors');

// require('dotenv').config();
// const app = express();
// const port = process.env.PORT || 5000;
// // middle wares
// app.use(cors());
// app.use(express.json());

// //console.log(uri);

// async function run() {
//     try {
//         const serviceCollection = client.db('makeupService').collection('services');

//         app.get('/services', async (req, res) => {
//             const query = {}
//             const cursor = serviceCollection.find(query);
//             const services = await cursor.toArray();
//             res.send(services);
//         });

//     }
//     finally {

//     }

// }

// run().catch(err => console.error(err));

// app.get('/', (req, res) => {
//     res.send('Makeup server is running')
// })

// app.listen(port, () => {
//     console.log(`Makeup server running on ${port}`);
// })
