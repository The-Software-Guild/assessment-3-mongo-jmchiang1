import React, { useReducer } from 'react';
import axios from 'axios';
import BugContext from './bugContext';
import bugReducer from './bugReducer';
import {
  GET_BUGS,
  ADD_BUG,
  DELETE_BUG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BUG,
  FILTER_BUGS,
  BUG_ERROR,
} from '../types';

const BugState = (props) => {
  const initialState = {
    bugs: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(bugReducer, initialState);

  // Get Bugs
  const getBugs = async () => {
    try {
      const res = await axios.get('/api/bugs');

      dispatch({ type: GET_BUGS, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  // Add Bug
  const addBug = async (bug) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/bugs', bug, config);

      dispatch({ type: ADD_BUG, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  // Update Bug
  const updateBug = async (bug) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/bugs/${bug._id}`, bug, config);

      dispatch({ type: UPDATE_BUG, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  // Delete Bug
  const deleteBug = async (id) => {
    try {
      await axios.delete(`api/bugs/${id}`);

      dispatch({ type: DELETE_BUG, payload: id });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  // Set current bug data in form 
  const setCurrent = (bug) => {
    dispatch({ type: SET_CURRENT, payload: bug });
  };

  // Clear current bug data in form 
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Bugs component
  const filterBugs = (text) => {
    dispatch({ type: FILTER_BUGS, payload: text });
  };

  return (
    <BugContext.Provider
      value={{
        bugs: state.bugs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getBugs,
        addBug,
        deleteBug,
        updateBug,
        setCurrent,
        clearCurrent,
        filterBugs,
      }}
    >
      {props.children}
    </BugContext.Provider>
  );
};

export default BugState;
