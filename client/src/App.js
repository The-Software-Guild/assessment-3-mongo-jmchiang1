<<<<<<< HEAD
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import BugState from "./context/bug/BugState";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./context/setAuthToken";
import "./App.css";
=======
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import BugState from './context/bug/BugState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './context/setAuthToken';
import './App.css';
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

<<<<<<< HEAD
//entire app should have access to authState and BugState data
=======
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
const App = () => {
  return (
    <AuthState>
      <BugState>
<<<<<<< HEAD
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
=======
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
      </BugState>
    </AuthState>
  );
};

export default App;
