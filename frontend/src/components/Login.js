import React, {useState, useContext} from 'react';

const Login = () => {
    const [user, loginUser] = useState({
        email:'', pass:''
    });
    const { email, pass } = user;
    const changeHandler = (e) => {
        loginUser({
            ...user, [e.target.name]: e.target.value
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        loginUser({ email:'', pass:'' });
    }
    return (
        <div className="container my-5">
            <form onSubmit={submitHandler}>
                <input onChange={changeHandler} name="email" type="email" placeholder="email" value={email}/>
                <input onChange={changeHandler} name="pass" type="password" placeholder="password" value={pass}/>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
