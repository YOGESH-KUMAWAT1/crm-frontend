import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const OrdersPlannedDeliveryChart = ({ data }) => {
  const chartData = {
    labels: ['Planned', 'Delivered'],
    datasets: [{
      label: 'Orders',
      data: [data.planned, data.delivered],
      backgroundColor: ['#3b82f6', '#10b981'],
      borderRadius: 4,
    }],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <h3>Orders Planned for Delivery Today</h3>
      <div style={{ height: 200 }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default OrdersPlannedDeliveryChart;
