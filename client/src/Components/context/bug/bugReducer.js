import { GET_BUGS, ADD_BUG, DELETE_BUG, UPDATE_BUG } from "../types";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_BUGS:
      return {
        ...state,
        bugs: action.payload,
        loading: false,
      };
    case ADD_BUG:
      return {
        ...state,
        bugs: [...state.bugs, action.payload],
        loading: false,
      };
    case DELETE_BUG:
      return {
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
      default: return state;
  }
};

export default reducer