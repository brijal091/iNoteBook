import NoteContext from "./noteContext";
import {useState} from "react";

// This is our Context API 
const NoteState = (props) => {
   const notesInitial = [
    {
      "_id": "63453ebf447a5440cbb47b12",
      "user": "633e6db3075059d2199866ab",
      "title": "Updated New Note",
      "description": "Please Make your dreams",
      "tag": "Me",
      "date": "2022-10-11T10:00:31.015Z",
      "__v": 0
    },
    {
      "_id": "634556f86b6d01be35d036d0",
      "user": "633e6db3075059d2199866ab",
      "title": "New Note",
      "description": "Please Make your dreams",
      "tag": "Me",
      "date": "2022-10-11T11:43:52.624Z",
      "__v": 0
    },
    {
      "_id": "634556fd6b6d01be35d036d2",
      "user": "633e6db3075059d2199866ab",
      "title": "New Note",
      "description": "Please Make your dreams",
      "tag": "Me",
      "date": "2022-10-11T11:43:57.704Z",
      "__v": 0
    },
    {
      "_id": "634556fe6b6d01be35d036d4",
      "user": "633e6db3075059d2199866ab",
      "title": "New Note",
      "description": "Please Make your dreams",
      "tag": "Me",
      "date": "2022-10-11T11:43:58.553Z",
      "__v": 0
    },
    {
      "_id": "634556ff6b6d01be35d036d6",
      "user": "633e6db3075059d2199866ab",
      "title": "New Note",
      "description": "Please Make your dreams",
      "tag": "Me",
      "date": "2022-10-11T11:43:59.155Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)

  // Add a note
  const addNote = (title, description, tag) => {

    const note = {
      "_id": "634556ff6b6d01be35d036d6",
      "user": "633e6db3075059d2199866ab",
      "title": "New Note",
      "description": "Make money work for you [Added]",
      "tag": "Me",
      "date": "2022-10-11T11:43:59.155Z",
      "__v": 0
    };
    // const note = {title, description, tag}
    setNotes(notes.push(note))
  }


  // Delete a Note
  const deleteNote = () => {
    
  }

  // Edit a Note
  const editNote = () => {
    
  }
    return (
        // Remember the Syntex 
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;