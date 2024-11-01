// frontend/src/components/PortfolioView.tsx
import React, { useEffect, useState } from 'react';
import { 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow,
    Typography
} from '@mui/material';
import { PortfolioItem } from '../types';
import { api } from '../services/api';

export const PortfolioView: React.FC = () => {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await api.getPortfolio();
                // Convert string values to numbers
                const processedData = response.data.map((item: any) => ({
                    ...item,
                    current_price: Number(item.current_price),
                    shares_owned: Number(item.shares_owned),
                    total_investment: Number(item.total_investment)
                }));
                setPortfolio(processedData);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };

        fetchPortfolio();
    }, []);

    const calculateTotalValue = () => {
        return portfolio.reduce((total, item) => {
            return total + (item.current_price * item.shares_owned);
        }, 0);
    };

    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Portfolio Summary
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Total Value: ${calculateTotalValue().toFixed(2)}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell align="right">Shares</TableCell>
                        <TableCell align="right">Current Price</TableCell>
                        <TableCell align="right">Market Value</TableCell>
                        <TableCell align="right">Total Investment</TableCell>
                        <TableCell align="right">Gain/Loss</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {portfolio.map((item) => {
                        const marketValue = item.current_price * item.shares_owned;
                        const gainLoss = marketValue - item.total_investment;
                        
                        return (
                            <TableRow key={item.symbol}>
                                <TableCell>{item.symbol}</TableCell>
                                <TableCell>{item.company_name}</TableCell>
                                <TableCell align="right">{item.shares_owned}</TableCell>
                                <TableCell align="right">
                                    ${Number(item.current_price).toFixed(2)}
                                </TableCell>
                                <TableCell align="right">
                                    ${marketValue.toFixed(2)}
                                </TableCell>
                                <TableCell align="right">
                                    ${Number(item.total_investment).toFixed(2)}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    sx={{ color: gainLoss >= 0 ? 'success.main' : 'error.main' }}
                                >
                                    ${gainLoss.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default PortfolioView;