import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CURRENT } from "../types";

export default (state, action) => {
    switch(action.type) {
        case ADD_CONTACT: 
            return {
                ...state, contacts: [...state.contacts, action.payload]
            };
        case DELETE_CONTACT:
            return {
                ...state, contacts: state.contacts.filter(x => x.id !== action.payload)
            };
        case SET_CURRENT:
            return {
                ...state, current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state, current: null
            }
        case UPDATE_CURRENT:
            const updatedContacts = state.contacts.map((each) => {
                if (each.id === action.payload.id) {
                    return action.payload.contact_data;
                }
                else {
                    return each;
                }
            })
            return {
                ...state, contacts: updatedContacts
            };            
        default:
            return state;
    }
}
