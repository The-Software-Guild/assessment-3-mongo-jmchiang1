import React, { useContext, useEffect } from "react";
import Bugs from "./Bugs";
import BugForm from "./BugForm";
import AuthContext from "../context/auth/authContext";
import "./CSS Styling/Home.css";
import tracker from '../Images/bugtracker.png'

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext; //ability to use "isAuthenticated"

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) {
    return (
      <div className='home-page'>
        <h1>Welcome to my Bug Tracker Site!</h1>
        <h1>Please sign in or register to continue!</h1>
        <img src={tracker} alt="nothing to see here" width={500} height={500} />
      </div>
    );
  }
  return (
    <div className="home-container">
      <div className="form">
        <BugForm />
      </div>
      <div className="bugs">
        <Bugs />
      </div>
    </div>
  );
};

export default Home;
