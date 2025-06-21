import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import {useLogin} from "../LoginContext";


export default function SignupPage() {
    const [ data,setdata] = useState({});
    let cart = useLogin();
    let go = useNavigate();
   
      const update = (e) => {
        const { name, value } = e.target;
        setdata(() => ({
          ...data,
          [name]: value
        }));
      };
      
      const submit =async ()=>{
       cart.signUp(data);

      }
  return (
    <div className="container-fluid bg-light d-flex justify-content-center align-items-center min-vh-100">
    <div className="card shadow p-5" style={{ maxWidth: '500px', width: '100%', borderRadius: '20px' }}>
      <h2 className="text-center mb-4">Create Your Account</h2>
      
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <div className="input-group">
            <span className="input-group-text"><FaUser /></span>
            
            <input
              type="text"
              id="fullName"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              onChange={update}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <div className="input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={update}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={update}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2" onClick={()=>submit()}>
          Sign Up
        </button>
      

      <p className="text-center mt-3 mb-0 text-muted">
        Already have an account?{" "}
        
        <Link to="/" className="text-primary">Log in</Link>
      </p>
    </div>
  </div>
  )
};
