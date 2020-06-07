import React, { useReducer, createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

export const ContactContext = createContext();

const ContactStateProvider = (props) => {
    const initialState = {
        contacts : [
            {
                id: 1,
                name: "name1",
                email: "email@email.com",
                phone: "9499499499",
                type: "personal"
            },
            {
                id: 2,
                name: "name2",
                email: "email@email.com",
                phone: "9499499499",
                type: "personal"
            }
        ],
        current: null
    };
    
    const [state, dispatch] = useReducer(contactReducer, initialState);
    const addContact = (data) => {
        data.id = uuidv4();
        //action
        dispatch({ type: ADD_CONTACT, payload: data  })
    };
    const deleteContact = (contact_id)  => {
        //action
        dispatch({ type: DELETE_CONTACT, payload: contact_id})
    };
    const setCurrent = (currentContact) => {
        //action
        dispatch({ type: SET_CURRENT, payload: currentContact })
    }
    const clearCurrent = () => {
        //action
        dispatch({ type: CLEAR_CURRENT })
    }
    return (
        <ContactContext.Provider value={
            { contacts : state.contacts, addContact, deleteContact, setCurrent }
        }>
        {props.children}
        </ContactContext.Provider>
    )
};

export default ContactStateProvider;