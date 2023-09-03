import React, { useState } from 'react';
import Navbar from './Navbar';

import './Signup.css'
import FilledAlerts from './FilledAlerts';

export default function Login() {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const postInp = async (e) => {
    e.preventDefault();
    const res = await fetch('https://swiftnote.onrender.com/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      }),
      credentials: 'include'
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert('Invalid Credentials');
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 2 seconds
      }, 1000);
    }
  };


  return (
    <>
      <Navbar />
      {showAlert && <FilledAlerts value="Login Successful" />}
      <div className="container d-flex flex-column justify-content-center align-item-center min-vh-100">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 loginImg">
            <img src="Images/SignIn.svg" alt="SignIn" />
          </div>
          <form className="col-lg-6 col-md-6 col-sm-12 my-auto">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">E-mail</label>
              <input type="email" className="form-control" onChange={(e) => setemail(e.target.value)} value={email} id="exampleFormControlInput1" name='email' placeholder="Enter Your Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={(e) => setpassword(e.target.value)} value={password} id="exampleFormControlInput2" name='password' placeholder="Enter Your Password" />
            </div>
            <div className='btnn'>
              <button type="button" className="btn btn-primary mt-2" onClick={postInp}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
