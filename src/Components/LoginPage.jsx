import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../LoginContext";

function LoginPage() {
  const [data, setdata] = useState({ email: "", password: "" });
  const cart = useLogin();
  const go = useNavigate();

  const update = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (cart?.user !== null) {
      go("/home"); 
    }
  }, [cart?.user, go]);

  const submit = async (e) => {
    e.preventDefault();
    if (cart?.login) {
      cart.login(data); 
    } else {
      alert("Login system not initialized.");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }}
      >
        <h3 className="text-center mb-4">Welcome Back</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={update}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                onChange={update}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3 text-muted">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
