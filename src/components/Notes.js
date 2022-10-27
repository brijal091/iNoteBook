import React from 'react';
import { useContext, useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import NotesItem from './NotesItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;
    useEffect(() => {
      getNotes()
    }, [])
    
  return (
    <>
    <AddNote/>
    <div className="row mt-10">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <NotesItem note = {note} key = {note._id} />
        })}
      </div>
      </>
  )
}

export default Notes;