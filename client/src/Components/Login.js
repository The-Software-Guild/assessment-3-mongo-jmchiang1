import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import './CSS Styling/Login.css'

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {  //if authenicated, push user to home page
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      window.alert("Invalid Credentials");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({  //initalize email and password to empty string
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
      login({ //login user with email and password
        email,
        password,
      });
    }

  return (
    <div className="login-container">
      <h1> Account Login </h1>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Email Address (must be unique)</h2>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <h2>Password (must be longer than 6 characters)</h2>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
      <button type="submit" value="Login">Login</button>
      </form>
    </div> 
  );
};

export default Login;
