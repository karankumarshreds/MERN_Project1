import { REGISTER_SUCCESS, REGISTER_FAIL } from "../types";

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
        default: 
            return state;
    }
}