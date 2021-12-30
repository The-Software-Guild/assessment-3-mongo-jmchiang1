import React, { useReducer } from "react";
import bugContext from "./bugContext";
import bugReducer from "./bugReducer";
import axios from "axios";
import { GET_BUGS, ADD_BUG, DELETE_BUG, UPDATE_BUG, BUG_ERROR } from "../types";

const BugState = (props) => {
  const initialState = {    //initial state with no bugs and no errors
    bugs: null,
    error: null,
  };

  //dipsatch sends the type of action to the reducer for changing state 
  const [state, dispatch] = useReducer(bugReducer, initialState);

  //GET all bugs 
  const getBugs = async () => {
    try {
      const res = await axios.get("/api/bugs");
    //type: identifies the dispatched action
    //payload: info that the action will add to the state.
      dispatch({ type: GET_BUGS, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  //Add single bug
  const addBug = async (bug) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/bugs", bug, config);
      dispatch({ type: ADD_BUG, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  //Update single bug
  const updateBug = async (bug) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/bugs/${bug._id}`, bug, config);
      dispatch({ type: UPDATE_BUG, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  //Delete single bug
  const deleteBug = async (id) => {
    try {
      await axios.delete(`api/bugs/${id}`);

      dispatch({ type: DELETE_BUG, payload: id });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  return (
    <bugContext.Provider value={{ 
        bug: state.bugs,
        error: state.error,
        getBugs,
        addBug,
        updateBug,
        deleteBug
        }}>
      {props.children}
    </bugContext.Provider>
  );
};

export default BugState;

//https://www.youtube.com/watch?v=_1QtdnqHq8I&ab_channel=CandDev
