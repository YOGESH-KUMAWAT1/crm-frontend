// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import HomeDashboard from './components/HomeDashboard'; 
import ProcessDashboard from './components/ProcessDashboard'; // <--- Make sure this import is correct and component exists
import '../src/App.css'; // Assuming you have a CSS file for global styles
import CustomerManagementPage from './components/CustomerManagementPage';
// ... (other placeholder imports)

function App() {
  return (
    <Router>
      <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TopNav /> {/* Ensure TopNav is here */}

        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/dashboard" element={<HomeDashboard />} />
            <Route path="/process" element={<ProcessDashboard />} /> {/* <--- This route is crucial */}
            <Route path="/allCustomers" element={<CustomerManagementPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;