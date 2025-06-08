import React from 'react';
import { Shirt, Briefcase, Users, FileText } from 'lucide-react';
import '../styles/GarmentsAndJobsCard.css';

const iconMap = {
  Garments: <Shirt size={24} />,
  Jobs: <Briefcase size={24} />,
  Customers: <Users size={24} />,
  Invoices: <FileText size={24} />,
};

const GarmentsAndJobsCard = ({ title, data, className = '' }) => {
  return (
    <div className={`garments-jobs-card ${className}`}>
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <div className="card-icon">{iconMap[title] || null}</div>
      </div>
      <div className="data-section">
        {data.map(({ label, value }, idx) => (
          <div className="data-item" key={idx}>
            <span className="data-label">{label}:</span>
            <span className="data-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GarmentsAndJobsCard;
