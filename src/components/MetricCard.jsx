import React from 'react';
import InfoCard from '../components/InfoCard';

const MetricCard = ({ title, value, icon, bg }) => (
  <InfoCard
    title={title}
    value={value === '0' || value === '₹0' ? 'No data' : value}
    icon={icon}
    backgroundColor={bg}
  />
);

export default MetricCard;
