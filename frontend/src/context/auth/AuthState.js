import React, {createContext, useReducer} from 'react';
import authReducer from './authReducer';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const initialState = {
        //since token will be saved in browser
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: null,
        loading: true,
        errors: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState);
    //Load logged in user
    //Register user 
    const registerUser = async (registerData) => {
        const headers = {
            'Content-Type': "application/json"
        }
        const config = {
            headers : { 'Content-Type': 'application/json'}
        }
        const url = "http://localhost:5000/api/users/signup"
        try {
            // const res = await axios({
            //     url: "http://localhost:5000/api/users/signup",
            //     method: "POST",
            //     data: registerData,
            //     headers: {"Content-Type" : "application/json"}
            // });
            console.log(registerData);
            const res = await axios.post(url, registerData, config);
            console.log(res.data);   
            //res.data will give us the token
            dispatch({ type: REGISTER_SUCCESS, payload: res.data});
        } catch (err) {
            // dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
            console.log(err, 'errorrrrr');
        }
    }
    //Login user 
    //Logout and clear token
    //Clear errors 
    return (
        <AuthContext.Provider value={{ ...state, registerUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;