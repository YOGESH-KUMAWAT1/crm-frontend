import React from 'react';
// import './ChartCards.css'; // Assuming you have a CSS file for styling
import '../styles/HomeDashboard.css';
const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default ChartCard;
