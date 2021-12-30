import React, { useContext, useEffect } from 'react';
import Bugs from './Bugs';
import BugForm from './BugForm';
import AuthContext from '../context/auth/authContext';
import './CSS Styling/Home.css'


const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
