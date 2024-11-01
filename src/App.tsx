// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { AddStockForm } from './components/AddStockForm';
import { StockList } from './components/StockList';
import { AddTransactionForm } from './components/AddTransactionForm';
import { PortfolioView } from './components/PortfolioView';
import PortfolioCharts from './components/PortfolioCharts';
import { api } from './services/api';
import { PortfolioItem } from './types';

function App() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.getPortfolio();
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ m: 2 }}>
        Portfolio Tracker
      </Typography>
      
      <AddStockForm />
      <StockList />
      <AddTransactionForm />
      <PortfolioView />
      <PortfolioCharts portfolio={portfolio} />
    </Container>
  );
}

export default App;