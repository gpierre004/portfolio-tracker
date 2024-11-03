// frontend/src/services/api.ts
import axios from 'axios';
import { Stock, Transaction } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create an axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const api = {
    // Stocks
    getStocks: () => axiosInstance.get('/stocks'),
    addStock: (stock: Stock) => axiosInstance.post('/stocks', stock),
    
    // Transactions
    getTransactions: () => axiosInstance.get('/transactions'),
    addTransaction: (transaction: Transaction) => 
        axiosInstance.post('/transactions', transaction),
    
    // Portfolio
    getPortfolio: () => axiosInstance.get('/portfolio'),
};