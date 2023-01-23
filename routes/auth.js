require("dotenv").config();
const express = require('express');
const client = require('../configs/mongoClient')
const router = express.Router();


const Users = client.db('AiedDB').collection('users');


//Saved user in DB
router.post('/users', async (req, res) => {
  try {
    console.log('body', req.body);
    const isExists = await Users.findOne({ email: req.body.email })

    if (isExists) {
      return res.send({
        success: false,
        message: 'User already exists'
      })
    }

    const user = await Users.insertOne(req.body);
    // console.log(user);
    res.send({
      success: true,
      data: user
    })
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error: error.message
    })
  }
})



module.exports = router;