import React, {useState, useContext} from 'react';
import { ContactContext } from '../context/contact/ContactState';
import ContactItem from './contactItem';

const ContactList = () => {
    const {contacts} =  useContext(ContactContext);
    return(
        <div className="container">
            {contacts.map(each => {
                return <ContactItem 
                       name={each.name}  
                       email={each.email}
                       phone={each.phone}
                       type={each.type}
                       id={each.id}
                       key={each.id}
                       />
            })}
            
        </div>
    )
}

export default ContactList;

