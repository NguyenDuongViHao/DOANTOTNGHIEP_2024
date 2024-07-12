import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(PointElement, LineElement, Title, Tooltip, Legend);

const OrdersChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: data.map(item => item.orderCount),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Số lượng đơn hàng theo tháng',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default OrdersChart;
