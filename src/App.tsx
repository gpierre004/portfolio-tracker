// frontend/src/App.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import { AddStockForm } from './components/AddStockForm';
import { StockList } from './components/StockList';

function App() {
    return (
        <Container>
            <Typography variant="h4" sx={{ m: 2 }}>
                Portfolio Tracker
            </Typography>
            <AddStockForm />
            <StockList />
        </Container>
    );
}

export default App;