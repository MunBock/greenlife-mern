import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner/Spinner";
import Message from "../common/Message/Message";

import { register } from "../../actions/user";

import "./register.css";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      {message && <Message>{message}</Message>}
      {error && <Message>{error}</Message>}
      {loading && <Spinner />}
      <div className="form-place">
        <form className="form" onSubmit={submitHandler}>
          <div className="title">Register</div>
          <div className="input-place">
            <input
              type="text"
              value={name}
              className="input"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label className="input-label">Name</label>
          </div>

          <div className="input-place">
            <input
              type="email"
              value={email}
              className="input"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="input-label">Email</label>
          </div>
          <div className="input-place">
            <input
              type="password"
              value={password}
              className="input"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="input-label">Password</label>
          </div>

          <div className="input-place">
            <input
              type="password"
              value={confirmPassword}
              className="input"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="input-label">Confirm password</label>
          </div>
          <button className="button" type="submit">
            Register
          </button>
          <div className="registered-customer">
            <span className="registered-customer-title">
              Already registered?{" "}
            </span>
            <Link to="/login" className="registered-customer-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
