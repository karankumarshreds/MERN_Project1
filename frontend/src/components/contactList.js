import React, {useState, useContext} from 'react';
import { ContactContext } from '../context/contact/ContactState';
import ContactItem from './contactItem';

const ContactList = () => {
    const {contacts} =  useContext(ContactContext);
    console.log(contacts, 'here')
    return(
        <div className="container">
            {contacts.map(each => {
                console.log(each)
                return <ContactItem 
                       name={each.name}  
                       email={each.email}
                       phone={each.phone}
                       type={each.type}
                       />
            })}
            
        </div>
    )
}

export default ContactList;

