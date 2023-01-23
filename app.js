require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const client = require('./configs/mongoClient')
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");

app.use(cors());
app.use(express.json());

app.use(authRoute);
app.use(productRoute);


// function run = async
async function run() {
  try {
    await client.connect();
    console.log('Server connected');
  } catch (error) {
    console.log(error.message);
  }
}
run();



app.get('/', (req, res) => {
  res.send(`<h1>Server is running...</h1>`)
});


//resource not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});



module.exports = app;