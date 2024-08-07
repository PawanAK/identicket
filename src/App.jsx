import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScannerPage from './components/ScannerPage';
import ValidationResult from './components/ValidationResult';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ScannerPage />} />
          <Route path="/result" element={<ValidationResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;