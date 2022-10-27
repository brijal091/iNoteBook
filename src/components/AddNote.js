import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote() {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  })
  const context = useContext(noteContext);
  const { addnote } = context;
  const handleClick = () => {
    addnote(note);
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
          Submit
        </button>
      </form>
    </div>
  );
}
