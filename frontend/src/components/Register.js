import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../context/auth/AuthState';
import { Redirect } from 'react-router-dom';

const Register = (props) => {
    const [user, setUser] = useState({
        name:'', email:'', password:'', pass_:''
    });
    const { name, email, password, pass_ } = user;
    const { error, registerUser, isAuthenticated } = useContext(AuthContext);
    const changeHandler = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        registerUser({ name, email, password });
        setUser({ name:'', email:'', password:'', pass_:'' });
    }
    return (
        <>
        {isAuthenticated ? <Redirect to="/" /> : null}
        <div>
            {error ? <h1>Email already exists</h1> : ""}

            <form onSubmit={submitHandler}>
                <input onChange={changeHandler} name="name" type="text" placeholder="name" value={name}/>
                <input onChange={changeHandler} name="email" type="email" placeholder="email" value={email}/>
                <input onChange={changeHandler} name="password" type="password" placeholder="password" value={password}/>
                <input onChange={changeHandler} name="pass_" type="password" placeholder="password" value={pass_}/>
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
        </div>
        </>
    )
}

export default Register;
