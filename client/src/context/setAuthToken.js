import axios from 'axios';

<<<<<<< HEAD
//create a function which will set authorization header itself when the token is present in the store.
//place this function in the route file which is guaranteed to be executed every time
const setAuthToken = (token) => { 
=======
const setAuthToken = (token) => {
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
<<<<<<< HEAD


//https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
=======
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
