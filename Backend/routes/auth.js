const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/', body('email').isEmail(), body('password',"Password must me more then 5 char").isLength({ min: 5 }),(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.json(user))
    .catch(err => {console.log(err)})
    res.json({error: "Please Enter a Unique Value"})
  },
 )

module.exports = router