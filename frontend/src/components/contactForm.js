import React, {useState, useContext} from 'react';
import { ContactContext } from '../context/contact/ContactState';

const ContactForm = () => {
    const [contact, updateContact] = useState({
        name: '', email: '', phone: '', type: 'personal'
    })
    const { name, email, phone, type } = contact;
    const changeHandler = (e) => updateContact({
        ...contact, [e.target.name]: e.target.value
    });
    //using the method from Context API
    const { addContact } = useContext(ContactContext);
    const submitHandler = (e) => {
        e.preventDefault();
        //we will get this from context API
        addContact(contact);
        updateContact({name: '', email: '', phone: '', type: 'personal'})
    }
    return(
        <div className="container">
        <form onSubmit={submitHandler}>
            <h3>Add Contact</h3>
            <input type="text" value={name} name="name"onChange={changeHandler}/>
            <input type="email" value={email} name="email" onChange={changeHandler}/>
            <input type="text" value={phone} name="phone" onChange={changeHandler}/>
            <h5>Contact Type</h5>
            <input type="radio" value="personal" 
             name="type" onChange={changeHandler}
             checked={type === 'personal'}/> Personal
            <input type="radio" value="professional" 
             name="type" onChange={changeHandler}
             checked={type === 'professional'}/> Professional<br/>
             <button type="submit" className="btn btn-primary">Save</button>
        </form>
        </div>
    ) 
}

export default ContactForm;