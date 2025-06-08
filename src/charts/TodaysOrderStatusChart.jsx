import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TodaysOrderStatusChart = ({ data }) => {
  const { unprocessed, ready, delivered, total } = data;

  const chartData = {
    labels: ['Unprocessed', 'Ready', 'Delivered'],
    datasets: [{
      data: [unprocessed, ready, delivered],
      backgroundColor: ['#f97316', '#3b82f6', '#10b981'],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed;
            const percent = ((value / total) * 100).toFixed(1);
            return `${ctx.label}: ${value} (${percent}%)`;
          },
        },
      },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <div style={{ height: 200, position: 'relative' }}>
        <Doughnut data={chartData} options={options} />
        <div className="center-text" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <h2>{total}</h2>
          <p>Total Orders</p>
        </div>
      </div>
    </div>
  );
};

export default TodaysOrderStatusChart;
