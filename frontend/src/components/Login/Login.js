import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner/Spinner";
import Message from "../common/Message/Message";

import { login } from "../../actions/user";

import "./login.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {error && <Message>{error}</Message>}
      {loading && <Spinner />}
      <div className="form-place">
        <form className="form" onSubmit={submitHandler}>
          <div className="title">Login</div>
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
          <button type="submit" className="button">
            Login
          </button>
          <div className="new-customer">
            <span className="new-customer-title">New customer? </span>
            <Link to="/register" className="new-customer-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
