import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/pages/home';
import About from './components/pages/about';
import ContactStateProvider from './context/contact/ContactState';
import AuthStatePovider from './context/auth/AuthState';
import Register from './components/Register';
import Login from './components/Login';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  return (
    <div className="App">
      <AuthStatePovider>
      <ContactStateProvider>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Home/>}/>
        <Route exact path="/about" render={() => <About/>}/>
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
      </ContactStateProvider>
      </AuthStatePovider>
    </div>
  );
}

export default App;
