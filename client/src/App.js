import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Diagnose from './Diagnose';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return(
    <div className="App">
      <h1>App</h1>
      <Router>
        <Routes>
          <Route path="/" element = { <Login /> } />
          <Route path="/register" element = { <Register /> } />
          <Route path="/diagnose" element = { isLoggedIn? <Diagnose /> : <Navigate to="/" /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
