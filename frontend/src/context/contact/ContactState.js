import React, { useReducer, createContext, useState } from 'react';
import uuid from 'uuid';
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
            },
            {
                id: 3,
                name: "name3",
                email: "email@email.com",
                phone: "9499499499",
                type: "personal"
            }
        ]
    };
    
    const [state, dispatch] = useReducer(contactReducer, initialState);
    return (
        <ContactContext.Provider value={
            { contacts : state.contacts }
        }>
        {props.children}
        </ContactContext.Provider>
    )
};

export default ContactStateProvider;