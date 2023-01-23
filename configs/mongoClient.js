require("dotenv").config();
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


module.exports = client;