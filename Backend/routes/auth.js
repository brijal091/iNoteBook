const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "BrijalKansara"

// Route : 1 Create User
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
    const data = {
      user:{
        id: user.id
      }
    }
    const jwtData = jwt.sign(data, JWT_SECRET);
    console.log(jwtData);
    res.json(jwtData);
  }
    catch(error){
      console.error(error.message);
      res.status(500).send("Something went Wrong")
    }
    // res.json({error: "Please Enter a Unique Value"})
  } )


// Route : 2 Authenticating at login 
  router.post('/login', 
  body('email', "Please Enter Valid email").isEmail(), 
  body('password',"Password must me more then 5 char").isLength({ min: 5 }), async (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user){
      return res.status(400).json({error:"Wrong Credentials"})
    }
    const passCompair = await bcrypt.compare(password, user.password)
    if (!passCompair){
      return res.status(400).json({error:"Wrong Credentials"})
    }
       
    const data = {
      user:{
        id: user.id
      }
    }
    const jwtData = jwt.sign(data, JWT_SECRET);
    console.log(jwtData);
    res.json(jwtData);
  } 
  catch(error){
    console.error(error.message);
    res.status(500).send("Something is wrong")
  }
  });

  // Route : 3 /get loggedIn User details and Login is required here
  router.post('/getuser', fetchuser, async (req, res)=>{
  try {
    const userId = req.user.id;
    console.log(userId);

    // To Exclude the passwoed field here in responce we have used -passwoed here at the end 
    const user = await User.findById(userId).select("-password");
    // console.log(user)
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something is wrong")
  }
})
module.exports = router;