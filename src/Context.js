import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [note, setnote] = useState({ title: "", decs: "" });
    const [enote, esetnote] = useState({ id: "", etitle: "", edecs: "" });
    const addNote = (title, decs, id) => {
        const note = {
            "title": title,
            "decs": decs,
            "_id": id
        }
        setNotes(notes.concat(note))
    }



    const navigate = useNavigate();
    const ref = useRef(null);
    const refc = useRef(null);

    const editNote = async (id, title, decs) => {
        try {
            // Update the note in local state first
            setNotes((prevNotes) => {
                return prevNotes.map((note) => {
                    if (note._id === id) {
                        return {
                            ...note,
                            title,
                            decs,
                        };
                    }
                    return note;
                });
            });

            // Send the update to the server
            const res = await fetch(`https://swiftnote.onrender.com/editNote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, decs }),
                credentials: 'include',
            });

            if (res.ok) {
                window.alert('Note Updated');
            } else {
                window.alert('Operation Fail');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateNote = (currentNote) => {
        // console.log(ref.current)
        ref.current.click();
        esetnote({ id: currentNote._id, etitle: currentNote.title, edecs: currentNote.decs })
    };


    const deleteNote = async (id) => {
        try {
            const res = await fetch(`https://swiftnote.onrender.com/deleteNote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            const data = await res.json();

            if (res.status === 400 || !data) {
                window.alert('Operation Fail');
            } else {
                window.alert('Note Deleted');
                const newNotes = notes.filter((iNotes) => iNotes._id !== id);
                setNotes(newNotes);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const update = () => {
        editNote(enote.id, enote.etitle, enote.edecs)
        refc.current.click();
    }

    const getNotes = async () => {
        try {
            const res = await fetch('https://swiftnote.onrender.com/findNote', {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                },
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);
            setNotes(data);

        } catch (err) {
            console.log(err);
        }
    };

    const callNotes = async () => {
        try {
            const res = await fetch('https://swiftnote.onrender.com/notes', {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                },
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    };

    return <AppContext.Provider value={{ notes, updateNote, addNote, deleteNote, setNotes, ref, getNotes, callNotes, note, setnote, enote, esetnote, update, refc }}>{children}</AppContext.Provider>
}
export { AppContext, AppProvider };