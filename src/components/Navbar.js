import React from 'react'
import { NavLink } from 'react-router-dom'
import './Signup.css'

export default function Navbar() {
  const Logo = {
    height: '40px',
    width: '40px',
    marginRight: '10px',
  }
  return (
    <>
      <section className='Navbar'>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
          <div className="container-fluid">

            <div className='d-flex justify-content-center align-items-center'>
              <img style={Logo} src={`Images/edit.gif`} alt="Logo" />
              <NavLink className="navbar-brand fw-bolder" to="/logo" style={{ color: "gold", fontSize: "1.5rem" }}>SwiftNotes</NavLink>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: "gold" }}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink exact aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact aria-current="page" to="/notes">Notes</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact aria-current="page" to="/login">SignIn</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact aria-current="page" to="/signUp">SignUp</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact aria-current="page" to="/logout">LogOut</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </section>
    </>
  )
}
