import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import BugContext from "../context/bug/bugContext";
import "./CSS Styling/Navbar.css";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const bugContext = useContext(BugContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearBugs } = bugContext;

  const onLogout = () => {
    //logs out user and clears all bugs associated with that user
    logout();
    clearBugs();
  };

  const authenticatedButtons = (
    <div className="navbar-container">
      <p>Username: {user && user.name}</p>
      <a onClick={onLogout} href="/">
        <p>Logout</p>
      </a>
    </div>
  );

  const nonAuthenticatedButtons = (
    <div className="navbar-container">
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        {" "}
        <Link to="/register">Signup</Link>{" "}
      </p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );

  return (
    <div>
      <h2>
        {isAuthenticated ? authenticatedButtons : nonAuthenticatedButtons}
      </h2>
    </div>
  );
};

export default Navbar;
