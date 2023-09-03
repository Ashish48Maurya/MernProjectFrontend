import React, { useState } from 'react';
import Navbar from './Navbar';
import FilledAlerts from './FilledAlerts';

import { useNavigate } from 'react-router-dom';
import './Signup.css'

export default function Signup() {
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState({ username: "", password: "", cpassword: "", email: "" });
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = user;
    const res = await fetch('https://swiftnote.onrender.com/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, email, password, cpassword
      })
    })

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert('Invalid Registration');
    }
    else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 2 seconds
        navigate('/login')
      }, 500);
    }

  }
  return (
    <>
      <Navbar />
      {showAlert && <FilledAlerts value="Registration Successful" />}
      <div className="container d-flex flex-column justify-content-center align-item-center min-vh-100">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <img src="Images/login.svg" alt="SignUp" />
          </div>
          <form method='POST' className="col-lg-6 col-md-5 col-sm-12 my-auto">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
              <input type="text" className="form-control" onChange={handleInput} id="exampleFormControlInput1" placeholder="Enter Your Name Here" name='username' value={user.username} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">E-mail</label>
              <input type="email" className="form-control" onChange={handleInput} id="exampleFormControlInput2" placeholder="Enter Your E-Mail Here" name='email' value={user.email} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={handleInput} id="exampleFormControlInput2" placeholder="Enter Your Password" name='password' value={user.password} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" onChange={handleInput} id="exampleFormControlInput2" placeholder="Confirm Your Password" name='cpassword' value={user.cpassword} />
            </div>
            <div className='btnn'>
              <button type="button" className="btn btn-primary mt-2" onClick={PostData}>Sign Up</button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
