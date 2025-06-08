import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GarmentsAndJobsCard from './GarmentsAndJobsCard';
import InfoCard from '../components/InfoCard';
import TodaysOrderStatusChart from '../charts/TodaysOrderStatusChart';
import OrdersPlannedDeliveryChart from '../charts/OrdersPlannedDeliveryChart';
import '../styles/HomeDashboard.css';

const HomeDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const TABS = ['Overview', 'Customers', 'Orders', 'Revenue'];

  const garmentsData = [
    { label: 'Total Garments', value: '1500' },
    { label: 'Garments In Process', value: '120' },
    { label: 'Completed Garments', value: '1380' },
  ];

  const jobsData = [
    { label: 'Total Jobs', value: '300' },
    { label: 'Active Jobs', value: '25' },
    { label: 'Pending Approval', value: '5' },
  ];

  const orderStatusData = {
    unprocessed: 33,
    ready: 1,
    delivered: 34,
    total: 68,
  };

  const deliveryPlanData = {
    planned: 27,
    delivered: 34,
  };

  return (
    <div className="dashboard-container">
      {/* Fixed Header */}
      <header className="home-dashboard-header">
        <div className="home-header-top">
          <h1 className="home-header-title">Dashboard</h1>
        </div>

        <div className="home-dashboard-controls">
          <div className="controls-left">
            <label className="header-label">Dashboard</label>
            <div className="dashboard-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`dashboard-tab-button ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="controls-right">
            <div className="controls-group">
              <select>
                <option>ALL</option>
                <option>YOGESH LLP</option>
                <option>OM TEXTILES</option>
                <option>SHREE FASHIONS</option>
                <option>KAVYA GARMENTS</option>
                <option>RAJ INDUSTRIES</option>
              </select>

              <div className="date-range-picker">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={([start, end]) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  isClearable
                  placeholderText="Select date range"
                />
              </div>
            </div>

            <div className="actions">
              <button className="button-primary">Refresh</button>
              <button className="button-secondary">Settings</button>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="dashboard-scroll-section">
        {/* Info Cards and Garments/Jobs Cards */}
        <div className="dashboard-grid-top">
          <InfoCard title="Urgent Orders" value="0" icon="list-ul" backgroundColor="#d63384" />
          <InfoCard title="Service Requests" value="0" icon="bell" backgroundColor="#20c997" />
          <InfoCard title="Overdue Orders" value="148" icon="clock" backgroundColor="#fd7e14" />
          <InfoCard title="Payments Received" value="₹0" icon="money-bill" backgroundColor="#198754" />
          <InfoCard title="Outstanding Payments" value="₹2.57L" icon="credit-card" backgroundColor="#0d6efd" />
          <InfoCard title="Refunds (Lacs)" value="0" icon="undo" backgroundColor="#6c757d" />
          <GarmentsAndJobsCard title="Garments" data={garmentsData} className="wide-card" />
          <GarmentsAndJobsCard title="Jobs" data={jobsData} className="wide-card" />
        </div>

        {/* Charts */}
        <div className="dashboard-grid-bottom">
          <div className="chart-container">
            <h3>Today's Order Status</h3>
            <TodaysOrderStatusChart data={orderStatusData} />
          </div>
          <div className="chart-container">
            <h3>Planned Deliveries</h3>
            <OrdersPlannedDeliveryChart data={deliveryPlanData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
