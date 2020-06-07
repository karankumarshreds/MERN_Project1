import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import './Navbar.css'  

const Navbar_ = ({ title, icon }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar className="Navbar" color="dark" dark expand="md">
          <NavbarBrand href="/">
              Contact Keeper 
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    )
}

export default Navbar_;