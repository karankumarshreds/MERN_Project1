import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/pages/home';
import About from './components/pages/about';
import ContactStateProvider from './context/contact/ContactState';

function App() {
  return (
    <div className="App">
      <ContactStateProvider>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Home/>}/>
        <Route exact path="/about" render={() => <About/>}/>
      </Switch>
      </ContactStateProvider>
    </div>
  );
}

export default App;
