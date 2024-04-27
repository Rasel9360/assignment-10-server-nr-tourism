const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//  Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhgag9l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const spotsCollection = client.db("spotsDB").collection("spots")

    // send data
    app.get('/spots', async(req, res)=>{
        const curser = spotsCollection.find();
        const result = await  curser.toArray();
        res.send(result)
    })

    // get data server side individual id
    app.get('/spots/:id', async(req, res)=>{
        const id =  req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await  spotsCollection.findOne(query);
        res.send(result)
    })

    

    // crate data
    app.post('/spots', async(req, res) =>{
        const newSpots = req.body;
        console.log(newSpots);
        const result = await spotsCollection.insertOne(newSpots);
        res.send(result)
    })

    // update data
    app.get("/myProduct/:email", async (req, res)=>{
      // console.log(req.params.email)
      const myQuery = { userId: req.params.email };
      console.log(myQuery);
      const result = await spotsCollection.find(myQuery).toArray();
      res.send(result);
    })

    app.get("/singleSpot/:id", async  (req,res)=> {
      // console.log(req.params.id);
      const result = await spotsCollection.findOne({_id: new ObjectId(req.params.id)});
      // console.log(result);
      res.send(result);
    })

    // delete data
    app.delete('/myProduct/:id', async (req,res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      console.log(query);
      const result = await spotsCollection.deleteOne(query);
      res.send(result)
    })

    // get single data
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Assignment 10 server is running')
})

app.listen(port, () => {
    console.log(`Assignment 10 server running on: ${port}`)
})