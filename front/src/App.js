import React from 'react';
import Login from './scene/login/Login'
import Home from './scene/home/Home'
import Register from './scene/register/Register'
import Settings from './scene/home/settings/Settings'
import About from './scene/about/About'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router forceRefresh={true}>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/Register" exact element={<Register />} />
        <Route path="/Home" exact element={<Home />} />
        <Route path="/Home/Settings" exact element={<Settings />} />
        <Route path="/about.json" exact element={<About />} />
        <Route path="/" element={() => <div>ERROR</div>} />
      </Routes>
    </Router>
  );
}

export default App;
