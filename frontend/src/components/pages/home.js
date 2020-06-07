import React, { useContext, useEffect } from 'react';
import ContactList from '../contactList';
import ContactForm from '../contactForm';
import {AuthContext} from '../../context/auth/AuthState';

const Home = () => {
    /***********************************
     * We want to keep the user logged in 
     * using the token we have stored in 
     * the localstorage
     */
    const { loadUser } = useContext(AuthContext);
    useEffect( async () => {
        loadUser();
    }, []); // [] because we only want it to run
            // when the component loads
    return (
        <div className="container text-center mt-5">
        <ContactList />   
        <ContactForm />
        </div>
    )
}

export default Home;