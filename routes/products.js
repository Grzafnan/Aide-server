require("dotenv").config();
const express = require('express');
const client = require('../configs/mongoClient')
const router = express.Router();

const Products = client.db('AiedDB').collection('products');
const Carts = client.db('AiedDB').collection('carts');

router.get('/products', async (req, res) => {
  try {
    const products = await Products.find({}).toArray();
    res.send({
      success: true,
      data: products
    })
  } catch (error) {
    console.log(error.name, error.message);
    res.send({
      success: false,
      error: error.message
    })
  }
})


router.post('/add-cart', async (req, res) => {
  try {
    const result = await Carts.insertOne(req.body)
    res.send({ success: true, data: result })
  } catch (error) {
    console.log(error.name, error.message);
    res.send({ success: false, error: error.message })
  }
})


module.exports = router;