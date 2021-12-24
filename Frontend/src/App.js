import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const getData = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <h1>BUG TRACKER 3000</h1>
    <div className="container">
      {users.map((user) => {
        return (
          <div key={user._id} className="users">
            <h2>Name: {user.name} </h2>
            <h2>Email: {user.email} </h2>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default App;
