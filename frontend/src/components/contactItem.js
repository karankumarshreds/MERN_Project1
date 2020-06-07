import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const ContactItem = (props) => {
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
          </CardBody>
        </Card>
    )
}

export default ContactItem;