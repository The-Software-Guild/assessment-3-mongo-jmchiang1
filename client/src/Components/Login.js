import React, { useState, useContext, useEffect } from "react";
import userContext from "./context/user/userContext"

const Login = (props) => {
  const loginContext = useContext(userContext);
  const { login, error, isAuthenticated } = loginContext;

  useEffect(() => {
    if (isAuthenticated) {
      //if authenticated, direct user to homepage, which should have their bug info
      props.history.push("/");
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    //intialize user email and password to empty
    email: "",
    password: "",
  });

  const { email, password } = user; //take out email and password

  const onChange = (
    event //state change function
  ) =>
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please complete all fields");
    } else {
      login({
        //submit triggers login function with email and password
        email,
        password,
      });
    }
  };

  return (
    <div>
      <h1>Login Here</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <a href="/register">Don't have an account?</a>
    </div>
  );
};

export default Login;
