import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote() {

  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "defaults"
  })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})

  }

//   Note Here the Syntext is important 
  const onChange = (e) => {
    setNote({...note,[e.target.name]: e.target.value})
  }
  return (
    <div>
      <h1>Adda Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name = "title"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={onChange}
            type="text"
            name="description"
            className="form-control"
            id="description"
          />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note

        </button>
      </form>
    </div>
  );
}
