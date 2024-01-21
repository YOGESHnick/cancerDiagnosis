// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Diagnose from './pages/Diagnose';
// import Register from './pages/Register';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const userToken = localStorage.getItem('userToken');
//     if (userToken) {
//       console.log(userToken);
//       console.log(isLoggedIn);
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return(
//     <div className="App">
//       <h1>App</h1>
//       <Router>
//         <Routes>
//           <Route path="/" element = { <Login /> } />
//           <Route path="/register" element = { <Register /> } />
//           <Route path="/diagnose" element = { isLoggedIn? <Diagnose /> : <Navigate to="/" /> } />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Diagnose from './pages/Diagnose';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      // console.log(userToken);
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
  }, [isLoggedIn]); // Log the updated state whenever isLoggedIn changes

  return (
    <div className="App">
      <h1>App</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/diagnose"
            element={isLoggedIn ? <Diagnose /> : (<Navigate to="/diagnose" />)}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
