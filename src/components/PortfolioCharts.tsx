// frontend/src/components/PortfolioCharts.tsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { PortfolioItem } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export interface PortfolioChartsProps {
  portfolio: PortfolioItem[];
}

export const PortfolioCharts: React.FC<PortfolioChartsProps> = ({ portfolio }) => {
  const holdingsData: ChartData<'bar'> = {
    labels: portfolio.map(item => item.symbol),
    datasets: [
      {
        label: 'Market Value ($)',
        data: portfolio.map(item => item.current_price * item.shares_owned),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const allocationData: ChartData<'pie'> = {
    labels: portfolio.map(item => item.symbol),
    datasets: [
      {
        data: portfolio.map(item => item.current_price * item.shares_owned),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  const chartOptions: ChartOptions<'bar' | 'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Distribution',
      },
    },
  };

  return (
    <div>
      <h3>Portfolio Charts</h3>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <Bar data={holdingsData} options={chartOptions} />
        </div>
        <div style={{ flex: 1 }}>
          <Pie data={allocationData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCharts;