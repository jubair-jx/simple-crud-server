const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
//jubairofficial97
//ZvZBFFW29m8myQOh

//middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://jubair97:4XccZJwiBs5WRGSR@cluster0.udnr6tc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const collectionData = client.db("usersDB").collection("users");

    app.get("/users", async (req, res) => {
      const cursor = collectionData.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await collectionData.insertOne(user);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const getId = req.params.id;
      console.log("Please Request from DB", getId);
      const query = { _id: new ObjectId(getId) };
      const result = await collectionData.deleteOne(query);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My CRUD server is Running");
});

app.listen(PORT, (req, res) => {
  console.log(`Here is my server PORT ${PORT}`);
});
