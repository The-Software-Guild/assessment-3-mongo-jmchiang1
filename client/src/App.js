import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";

import BugState from "./Components/context/bug/bugState"
import UserState from "./Components/context/user/userState"

function App() {
  return (
    //wrap entire App inside User and Bug States so all components inside have access to their data
    <UserState>
      <BugState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </BugState>
    </UserState>
  );
}

export default App;
