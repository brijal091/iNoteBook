const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

router.post('/createuser', body('email').isEmail(), body('password',"Password must me more then 5 char").isLength({ min: 5 }), async (req, res)=>{
  // If errors occur return Bad req 
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check weather the user is already in database 
    try{
    let user = await User.findOne({email: req.body.email})
    if (user){
      return res.status(400).json({error: "User with this email already exist."})
    } 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Creating new user 
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    res.json(user);
  }
    catch(error){
      console.error(error.message);
      res.status(500).send("Something went Wrong")
    }
    // res.json({error: "Please Enter a Unique Value"})
  } )

module.exports = router