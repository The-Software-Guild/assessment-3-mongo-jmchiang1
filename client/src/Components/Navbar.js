import React from "react";
import { Link } from "react-router-dom";
import './Styling/Navbar.css'

function Navbar() {
  return (
    <div className="container">
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
