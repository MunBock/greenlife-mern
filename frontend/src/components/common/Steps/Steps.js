import React from "react";
import { Link } from "react-router-dom";

import "./steps.css";

const Steps = ({ step1, step2, step3 }) => {
  return (
    <nav className="steps-nav">
      {step1 ? (
        <>
          <Link className="steps-nav-link" to="/cart">
            Cart
          </Link>
          <Link className="steps-nav-link-active" to="/shipping">
            Delivery
          </Link>
          <div className="steps-nav-link-disabled" disabled>
            Payment
          </div>
        </>
      ) : (
        ""
      )}

      {step2 ? (
        <>
          <Link className="steps-nav-link" to="/cart">
            Cart
          </Link>
          <Link className="steps-nav-link" to="/shipping">
            Delivery
          </Link>
          <Link className="steps-nav-link-active" to="/payment">
            Payment
          </Link>
        </>
      ) : (
        ""
      )}

      {step3 ? (
        <>
          <Link className="steps-nav-link" to="/cart">
            Cart
          </Link>
          <Link className="steps-nav-link" to="/shipping">
            Delivery
          </Link>
          <Link className="steps-nav-link-active" to="/payment">
            Payment
          </Link>
        </>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Steps;
