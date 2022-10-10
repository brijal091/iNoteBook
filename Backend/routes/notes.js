const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser,async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something is wrong")
    }
} )

router.post('/addnote',fetchuser,[
    body('title', "Enter valid Title").isLength({min: 5}), 
    body('discription',"Give atleast 10 char").isLength({ min: 10 })],async (req, res)=>{
        try {
            
            const {title, description, tag} = req.body;
            const error = validationResult(req);
            if (!error.isEmpty){
                return res.status(400).json({errors: error.array()});
            }
            
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Something is wrong") 
        }
} )

module.exports = router;