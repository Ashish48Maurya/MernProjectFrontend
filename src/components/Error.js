import React from 'react';
import Navbar from './Navbar';
import './Error.css';
import { NavLink } from 'react-router-dom'

export default function Error() {
  return (
    <>
      <Navbar />

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className='d-flex flex-column align-items-center gap-3'>

          <img className='svg img-fluid' src={`Images/404.svg`} alt="Error" />

          <div className='text-center err'>
            <NavLink className='btn btn-primary' to='/'>Go Back</NavLink>
          </div>

        </div>
      </div>

    </>
  );
}
