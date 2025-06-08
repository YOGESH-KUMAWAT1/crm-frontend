import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => (
  <nav className="home-dashboard-nav">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`home-nav-button ${activeTab === tab ? 'active' : ''}`}
        onClick={() => onTabChange(tab)}
      >
        {tab}
      </button>
    ))}
  </nav>
);

export default Tabs;
