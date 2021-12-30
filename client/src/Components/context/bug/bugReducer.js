import { GET_BUGS, ADD_BUG, DELETE_BUG, UPDATE_BUG, BUG_ERROR } from "../types";

const bugReducer = (state, action) => {
  switch (action.type) {

    case GET_BUGS:
      return {  //return current state
        ...state,
        bugs: action.payload,
        loading: false,
      };

    case ADD_BUG:
      return {  //return current state plus previous state
        ...state,
        bugs: [...state.bugs, action.payload],
        loading: false,
      };

    case DELETE_BUG:
      return {  //return state of bugs that arent equal to bug.id
        ...state,
        bugs: state.bugs.filter((bug) => bug.id !== action.payload),
        loading: false,
      };

    case UPDATE_BUG:
      return {  
        ...state,
        bugs: state.bugs.map((bug) =>
          bug.id === action.payload._id ? action.payload : bug
        ),
        loading: false,
      };

    case BUG_ERROR:
      return {  //return error
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bugReducer;
