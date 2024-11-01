// frontend/src/services/api.ts
import axios from 'axios';
import { Stock, Transaction } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const api = {
    // Stocks
    getStocks: () => axios.get(`${API_BASE_URL}/stocks`),
    addStock: (stock: Stock) => axios.post(`${API_BASE_URL}/stocks`, stock),
    
    // Transactions
    getTransactions: () => axios.get(`${API_BASE_URL}/transactions`),
    addTransaction: (transaction: Transaction) => 
        axios.post(`${API_BASE_URL}/transactions`, transaction),
    
    // Portfolio
    getPortfolio: () => axios.get(`${API_BASE_URL}/portfolio`),
};