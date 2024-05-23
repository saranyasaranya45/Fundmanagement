import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FundraisingManagement from './Components/FundraisingManagement';
import './Components/Fund.css'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FundraisingManagement />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
