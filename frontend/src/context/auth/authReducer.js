import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from "../types";

export default (state, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS: 
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload, //adding additional response
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL: 
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case USER_LOADED: 
            return {
                ...state, 
                isAuthenticated: true,
                loading: false,
                //we get all the user data in response
                user: action.payload
            }
        case AUTH_ERROR: 
            return { //same as REGISTER_FAIL
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        default: 
            return state;
    }
}