// frontend/src/components/AddStockForm.tsx
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { api } from '../services/api';
import axios from 'axios';

export const AddStockForm: React.FC = () => {
    const [symbol, setSymbol] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.addStock({
                symbol: symbol.toUpperCase(),
                company_name: companyName,
                current_price: null
            });
            setSymbol('');
            setCompanyName('');
            // Add success notification here
        } catch (error) {
            console.error('Error adding stock:', error);
            // Add error notification here
            if (axios.isAxiosError(error)) {
                console.error('API Error:', error.response?.data);
            }
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ m: 2 }}>
            <TextField
                label="Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                sx={{ mr: 2 }}
            />
            <TextField
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                sx={{ mr: 2 }}
            />
            <Button type="submit" variant="contained">
                Add Stock
            </Button>
        </Box>
    );
};