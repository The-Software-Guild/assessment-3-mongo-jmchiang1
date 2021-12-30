import React, { useState, useContext, useEffect } from "react";
import userContext from "./context/user/userContext"

const Register = (props) => {
  const RegisterContext = useContext(userContext);
  const { register, error, isAuthenticated } = RegisterContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const onChange = (
    event
  ) =>
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      alert("Please complete all fields");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div>
      <h1>Register Here</h1>
      <form onSubmit={onSubmit}>
        <div className="name">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="email">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      <a href="/login">Already have an account?</a>
    </div>
  );
};

export default Register;
