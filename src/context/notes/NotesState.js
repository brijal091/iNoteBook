import NoteContext from "./noteContext";
import { useState } from "react";

// This is our Context API
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  
  // Get all Notes  
  const getNotes = async () => {
    // API call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      // body: JSON.stringify(title, description, tag),
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const url = `${host}/api/notes/addNote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify(title, description, tag),
    });
 
    const note = await response.json();
    console.log(note)
    setNotes(notes.concat(note))
  };

  // Delete a Note
  const deleteNote = async (note_id) => {
    // API call to delete
    const url = `${host}/api/notes/deletenode/${note_id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      // body: JSON.stringify(title, description, tag),
    });
    const json = await response.json();
    console.log(json)

    console.log(`Deleting Note with id ${note_id}`);
    const newNotes = notes.filter((note) => {
      return note._id !== note_id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const url = `${host}/api/notes/updatenot/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);

    let newNote = JSON.parse(JSON.stringify(notes))

    // Logic to edit in Client side
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote)
  };
  return (
    // Remember the Syntex
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

