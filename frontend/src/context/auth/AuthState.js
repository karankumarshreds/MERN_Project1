import React, {createContext, useReducer} from 'react';
import authReducer from './authReducer';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from '../types';
import setAuthToken from '../../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const initialState = {
        //since token will be saved in browser
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: false,
        loading: true,
        errors: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState);
    //Load logged in user
    const loadUser = async () => {
        /********************************************
         * Setting the token globally in utils folder
         * so that we dont have to add and remove it 
         * manually everytime we make a request
         */
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        const url = "http://localhost:5000/api/auth";
        try {
            const res = await axios.get(url);
            console.log(res.data);
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            console.log(err);
            dispatch({ type: AUTH_ERROR, payload: err.response.data })
        }
    };
    //Register user 
    const registerUser = async (registerData) => {
        const config = {
            headers : { 'Content-Type': 'application/json'}
        }
        const url = "http://localhost:5000/api/users/signup"
        try {
            const res = await axios.post(url, registerData, config);
            //res.data will give us the token
            dispatch({ type: REGISTER_SUCCESS, payload: res.data});
            //login the user after registration using the token returned
            loadUser();
        } catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response.data });
        }
    }
    //Login user 
    //Logout and clear token
    //Clear errors 
    return (
        <AuthContext.Provider value={{ ...state, registerUser, loadUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;