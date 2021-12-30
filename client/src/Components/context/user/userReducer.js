import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {

    case USER_LOADED:
      return {  //if user is loaded, return state with authentication set to true
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //when passed a key/value, add that key to localStorage, or update that key's value if it already exists.
      localStorage.setItem("token", action.payload.token);  //if login/register is successful, give out access token
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case USER_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token"); //remove access token, meaning user will no longer have access to any bugs
      return {
        ...state,
        token: null,            //no token
        isAuthenticated: false, //not authenticated
        loading: false,
        user: null,             //no user
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
