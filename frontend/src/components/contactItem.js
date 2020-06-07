import React, {useContext} from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { ContactContext } from '../context/contact/ContactState';

const ContactItem = (props) => {
  const { deleteContact, setCurrent } = useContext(ContactContext);
  const deleteHandler = (e) => {
    deleteContact(props.id);
  };
  const { id, name, email, phone, type } = props;
  const contact = [
    { id, name, email, phone, type}
  ];
  const setCurrentHandler = (e) => {
    setCurrent(contact);
  };
  return (
      <Card style={{ width: '18rem' }} className="mx-auto my-2">
        <CardBody style={{boxShadow: "2px 4px 5px 0px rgba(0,0,0,0.35)"}}>
          <CardTitle><h3>{props.name}</h3></CardTitle>
          <CardSubtitle>{props.email}</CardSubtitle>
          <CardText>{props.phone}</CardText>
          <CardText className="py-2" 
          style={{
              backgroundColor: "#8142f5", 
              color: "white",
              }}>
              {props.type}
          </CardText>
          <button className="btn btn-danger" onClick={deleteHandler}>Delete</button>
          <button className="btn btn-warning" onClick={setCurrentHandler}>Edit</button>
        </CardBody>
      </Card>
  )
}

export default ContactItem;