// frontend/src/components/AddTransactionForm.tsx
import React, { useState, useEffect } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    MenuItem, 
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import { api } from '../services/api';
import { Stock, Transaction } from '../types';

interface FormData {
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: string;
    price: string;
}

export const AddTransactionForm: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [formData, setFormData] = useState<FormData>({
        symbol: '',
        type: 'BUY',
        quantity: '',
        price: ''
    });

    useEffect(() => {
        const fetchStocks = async () => {
            const response = await api.getStocks();
            setStocks(response.data);
        };
        fetchStocks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const transaction: Transaction = {
                symbol: formData.symbol,
                type: formData.type,
                quantity: Number(formData.quantity),
                price: Number(formData.price)
            };
            await api.addTransaction(transaction);
            setFormData({ symbol: '', type: 'BUY', quantity: '', price: '' });
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ m: 2, display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Stock</InputLabel>
                <Select
                    value={formData.symbol}
                    label="Stock"
                    onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                >
                    {stocks.map((stock) => (
                        <MenuItem key={stock.symbol} value={stock.symbol}>
                            {stock.symbol}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select
                    value={formData.type}
                    label="Type"
                    onChange={(e) => setFormData({...formData, type: e.target.value as 'BUY' | 'SELL'})}
                >
                    <MenuItem value="BUY">Buy</MenuItem>
                    <MenuItem value="SELL">Sell</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            />

            <TextField
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
            />

            <Button type="submit" variant="contained">
                Add Transaction
            </Button>
        </Box>
    );
};