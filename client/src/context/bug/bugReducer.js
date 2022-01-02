import {
  ADD_BUG,
  DELETE_BUG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BUG,
  FILTER_BUGS,
  BUG_ERROR,
  GET_BUGS,
} from '../types';

const bugReducer = (state, action) => {
  switch (action.type) {
    case GET_BUGS:
      return {
        ...state,
        bugs: action.payload,
      };
    case ADD_BUG:
      return {
        ...state,
        bugs: [...state.bugs, action.payload],  //spread operator: add bug in place  
      };
    case DELETE_BUG:
      return {
        ...state,
        bugs: state.bugs.filter((bug) => bug._id !== action.payload), //filter for bugs that don't match bug.id
      };
    case UPDATE_BUG:
      console.log("action.payload._id",action.payload._id)  //return bug id 
      console.log("action.payload",action.payload)          //returns bug object
      return {
        ...state,
        bugs: state.bugs.map((bug) =>
        bug._id === action.payload._id ? action.payload : bug
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_BUGS:
      return {
        ...state,
        filtered: state.bugs.filter((bug) => {
          const regEx = new RegExp(`${action.payload}`, 'gi');
          return bug.name.match(regEx);
        }),
      };
    case BUG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bugReducer;