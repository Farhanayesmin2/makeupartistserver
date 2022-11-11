// ACEP is the basic step us
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const makeupLimitData = client.db("makeupArtist").collection("setlimit");
    const reviewsData = client.db("makeupArtist").collection("reviews");
// Get all services data
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = makeupCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

// Set id for specific id 
app.get('/services/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const service = await makeupCollection.findOne(query);
  res.send(service);
});
// // Set id for specific id
// app.get('/setlimit/:id', async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: ObjectId(id) };
//   const limit = await makeupLimitData.findOne(query);
//   res.send( limit);
// });
    app.post('/reviews', async (req, res) => {
      const reviews = req.body;
      const results = await reviewsData.insertOne(reviews);
      res.send(results);
} )

    // For get the reviews
      app.get('/reviews', async (req, res) => {
        const query = {};
        const cursor = reviewsData.find(query);
        const review = await cursor.toArray();
        res.send(review);
      });
  
    
// For the post data

app.post('/addservice', async (req, res) => {
  const addservice = req.body;
  const result = await makeupCollection.insertOne(addservice);
  res.send(result);
});

    // Set limit services data
    app.get("/setlimit", async (req, res) => {
      const query = {};
      const cursor = makeupLimitData.find(query);
      const limit = await cursor.toArray();
      res.send(limit);
    });

    
  } finally {
  }
}
run().catch((err) => {
  console.error(err.name.bg-red, err.message.bold);
});

app.get("/", (req, res) => {
  res.send("API 5000 PORT Running.");
});

app.listen(port, () => {
  console.log(`Makeup Artist runing on ${port}`);
});

