import axios from 'axios';

/**********************************
 * We are setting the default token 
 * so that we dont have to set it 
 * manually everytime we make a req 
 */

 const setAuthToken = (token) => {
     if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
     } else {
         delete axios.defaults.headers.common['x-auth-token'];
     }
 }

 export default setAuthToken;

 /************************************************
  * Called in AuthState.js and in the main App.js 
  */