import React, { useState, useEffect, useContext } from 'react'
import Navbar from './Navbar'
import { AppContext } from '../Context';
import './Signup.css'


export default function Notes() {
  const { notes, deleteNote, addNote, updateNote, ref, refc, getNotes, callNotes, note, enote, setnote, esetnote, update } = useContext(AppContext);


  const Setval = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  const eSetval = (e) => {
    esetnote({ ...enote, [e.target.name]: e.target.value })
  }


  const postNotes = async (e) => {
    e.preventDefault();
    const res = await fetch('https://swiftnote.onrender.com/notes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: note.title,
        decs: note.decs,
      }),
      credentials: 'include'
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert('Notes Not Saved');
    } else {
      const newNote = data;
      addNote(newNote.title, newNote._id, newNote.decs);
      getNotes(); //Due to Some Issue
    }

    setnote({ title: "", decs: "" });
  }


  useEffect(() => {
    callNotes();
    getNotes();
  }, []);


  return (
    <>
      <Navbar />

      <button type="button" style={{ display: 'none' }} className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Button</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form method='PUT'>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                  <input type="text" className="form-control" onChange={eSetval} value={enote.etitle} id="recipient-name" name='etitle' />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Description:</label>
                  <textarea className="form-control" id="message-text" onChange={eSetval} value={enote.edecs} name='edecs'></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refc} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={update}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container d-flex flex-column justify-content-center align-item-center min-vh-100'>
        <form className='mb-5' method='POST'>
          <div className="mb-3">
            <label htmlhtmlFor="exampleFormControlInput1" className="form-label">Note Title:</label>
            <input type="text" value={note.title} onChange={Setval} className="form-control" id="exampleFormControlInput1" name='title' />
          </div>
          <div className="mb-3">
            <label htmlhtmlFor="exampleFormControlTextarea1" className="form-label">Note Description:</label>
            <textarea className="form-control" name='decs' value={note.decs} onChange={Setval} id="exampleFormControlTextarea1" rows="3" style={{ border: "2px solid black" }}></textarea>
          </div>
          <div className="text-center btnn">
            <button type="button" onClick={postNotes} className="btn btn-primary">Save</button>
          </div>
        </form>
        <h3 className='text-center'>Your Notes</h3>
        <ul className="list-group container mt-2">
          {notes.length > 0 ? (
            notes.map((note) => {
              return (
                <li className="list-group-item d-flex justify-content-between align-items-start m-1" key={note._id}>
                  <div className="ms-2 me-auto float-start">
                    <div className="fw-bold">{note.title}</div>
                    {note.decs}
                  </div>

                  <div className="my-auto d-flex justify-content-between align-items-end" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => deleteNote(note._id)} className="btn btn-danger me-2"><i className="fa-solid fa-trash"></i></button>
                    <button type="button" onClick={() => updateNote(note)} className="btn btn-success"><i className="fa-solid fa-pen-to-square"></i></button>
                  </div>
                </li>
              );
            })
          ) : (
            <h2 className='text-center'>No notes available</h2>
          )}
        </ul>
      </div>
    </>
  )
}