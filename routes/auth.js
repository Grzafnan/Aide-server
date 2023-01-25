require("dotenv").config();
const express = require('express');
const { ObjectId } = require("mongodb");
const client = require('../configs/mongoClient')
const router = express.Router();


const Users = client.db('AiedDB').collection('users');

const AddUsers = client.db('AiedDB').collection('addUsers');


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


//Get single User
router.get('/users/:email', async (req, res) => {
  try {
    const { email } = req.params
    // console.log(email);
    const result = await Users.findOne({ email: email })
    // console.log(result);

    res.send({
      success: true,
      role: result.role,
    })

  } catch (error) {
    res.send({
      success: false,
      error: error.message
    })
  }
})



// Get Users
router.get('/all-users', async (req, res) => {
  try {
    const allUsers = await AddUsers.find({}).toArray();
    res.send({
      success: true,
      data: allUsers
    })
  } catch (error) {
    console.log(error.name, error.message);
    res.send({
      success: false,
      error: error.message
    })
  }
})

// post User 
router.post('/add-user', async (req, res) => {

  console.log("user--->", req.body);
  try {
    const isExists = await AddUsers.findOne({ email: req.body.email })

    if (isExists) {
      return res.send({
        success: false,
        message: 'User already exists'
      })
    }

    const result = await AddUsers.insertOne(req.body)
    res.send({ success: true, data: result })
  } catch (error) {
    console.log(error.name, error.message);
    res.send({ success: false, error: error.message })
  }
})


//Get single User
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params
    console.log(email);
    const result = await Users.findOne({ email: email })
    console.log(result);

    res.send({
      success: true,
      role: result.role,
    })

  } catch (error) {
    res.send({
      success: false,
      error: error.message
    })
  }
})


// Delete User
router.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await AddUsers.deleteOne({ _id: ObjectId(id) });
    console.log(result);
    res.send({ success: true, data: result })
  } catch (error) {
    console.log(error.name, error.message)
    res.send({ success: false, error: error.message })
  }
})


module.exports = router;