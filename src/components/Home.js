import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Signup.css'
import { NavLink } from 'react-router-dom';

export default function Home() {

  const [userName, setusername] = useState('');
  const [show, setshow] = useState(false)
  const HomePage = async () => {
    try {
      const res = await fetch('http://localhost:5000/getdata', {
        method: "GET",
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      console.log(data);
      setusername(data.username);
      setshow(true);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    HomePage();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column justify-content-center align-item-center min-vh-100">
        <div className="row">
          <div className='col-lg-6 col-md-6 col-sm-12 HomeImg'>
            <img src={`Images/notes.svg`} alt="Notes SVG" style={{ maxWidth: "500px", borderRadius: "1rem" }} />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 my-auto'>
            <div className='text-center fw-bolder pb-4' style={{ color: "navy" }}>
              {show ? <h2>Hello <span style={{ color: "red" }}>{userName}</span>, Welcome to SwiftNotes: Your Digital Notebook</h2> : <h1>SwiftNotes: Your Digital Notebook</h1>}
            </div>



            <h5 className='text-center fw-bolder pb-2'>"Welcome to SwiftNotes, your digital notepad for capturing thoughts on the go. Whether you're jotting down ideas, making to-do lists, or drafting notes, SwiftNotes makes it effortless. With our user-friendly interface, you can organize your thoughts seamlessly and access them anytime, anywhere. Simplify your note-taking experience with SwiftNotes."</h5>
            <div className="btnn">
              <NavLink to='/signup'><button type="button" class="btn btn-success" style={{ backgroundColor: "black", marginBlock: "1rem" }}>Sign Up</button></NavLink>
              <NavLink to='/notes'><button type="button" class="btn btn-success float-end" style={{ backgroundColor: "black", marginBlock: "1rem" }}>View</button></NavLink>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
