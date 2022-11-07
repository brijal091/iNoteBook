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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzZTZkYjMwNzUwNTlkMjE5OTg2NmFiIn0sImlhdCI6MTY2NTM4MDQ2MH0.rx7xvg2ptsgv908z6DyYYLI6KJ2tU8Pywvm5En7ys1Q",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzZTZkYjMwNzUwNTlkMjE5OTg2NmFiIn0sImlhdCI6MTY2NTM4MDQ2MH0.rx7xvg2ptsgv908z6DyYYLI6KJ2tU8Pywvm5En7ys1Q",
      },
      body: JSON.stringify(title, description, tag),
    });
    const json = response.json();

    // Logic to add in client side
    console.log("Adding a new node");
    const note = {
      _id: "634556ff6b6d01be35d036d6",
      user: "633e6db3075059d2199866ab",
      title: title,
      description: description,
      tag: tag,
      date: "2022-10-11T11:43:59.155Z",
      __v: 0,

    };
    // const note = {title, description, tag}
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = (note_id) => {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzZTZkYjMwNzUwNTlkMjE5OTg2NmFiIn0sImlhdCI6MTY2NTM4MDQ2MH0.rx7xvg2ptsgv908z6DyYYLI6KJ2tU8Pywvm5En7ys1Q",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    // Logic to edit in Client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    // Remember the Syntex
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

