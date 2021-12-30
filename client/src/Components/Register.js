import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists") {
      window.alert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      window.alert("Please complete all fields");
    } else {
      register({name, email, password });
    }
  };

  return (
    <div className="container">
      <h1>Register New Account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Name</h2>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <button type="submit" value="Sign Up">Sign Up</button>
      </form>
    </div>
  )
};

export default Register;
