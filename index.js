const express = require('express');
var cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f6j7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

  try {
    await client.connect();
    const database = client.db('carMechnic');
    const servicesCollection = database.collection('services');


    //POST API
    app.post('/services', async (req, res) => {
      const service = req.body;
      console.log('hit the post api', service);
      const result = await servicesCollection.insertOne(service);
      console.log(result);
      // res.send('post hitted');
      res.json(result);


    });


  }

  finally {
    // await client.close();
  }

}


run().catch(console.dir);
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("insertDB");
//     const haiku = database.collection("haiku");
//     // create a document to insert
//     const doc = {
//       title: "Record of a Shriveled Datum",
//       content: "No bytes, no problem. Just insert a document, in MongoDB",
//     }
//     const result = await haiku.insertOne(doc);
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Running Genius Server  okkkkk');
})

app.listen(port, () => {
  console.log('Running Genius Server on Port', port);
})