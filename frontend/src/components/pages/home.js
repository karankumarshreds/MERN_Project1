import React from 'react';
import ContactList from '../contactList';
import ContactForm from '../contactForm';

const Home = () => {
    return (
        <div className="container text-center mt-5">
        <ContactList />   
        <ContactForm />
        </div>
    )
}

export default Home;