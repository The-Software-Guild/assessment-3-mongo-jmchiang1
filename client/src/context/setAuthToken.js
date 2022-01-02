import axios from 'axios';

//create a function which will set authorization header itself when the token is present in the store.
//place this function in the route file which is guaranteed to be executed every time
const setAuthToken = (token) => { 
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;


//https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
