import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function About() {
  const a = useContext(noteContext)
  return (
    <div>This is {a.name}</div>
  )
}
