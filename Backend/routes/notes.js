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

router.put('/updatenot/:id',fetchuser, async (req, res)=>{
       const {title, description, tag}  = req.body 
    //    Create a newNote object 
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};

    // Find the note to be updated 

    // Readintg the id from the URL 
    let note = await Note.findById(req.params.id)
    if (!note){return res.status(404).send("Not Found")};
    if (note.user.toString() !== req.user.id){
        return res.status.send(401).send("Not allowed");
    }
// Here new: true means that if any new object is added to that note than it will be created 
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note})
} )


router.delete('/deletenode/:id',fetchuser, async (req, res)=>{
 // Readintg the id from the URL 
 let note = await Note.findById(req.params.id)
 if (!note){return res.status(404).send("Not Found")};

 if (note.user.toString() !== req.user.id){
     return res.status.send(401).send("Not allowed");
 }
// Here new: true means that if any new object is added to that note than it will be created 
 note = await Note.findByIdAndDelete(req.params.id)
 res.json({"sucess":"Note has been deleted"})
} )

module.exports = router;