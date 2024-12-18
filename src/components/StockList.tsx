import React, { useEffect, useState } from 'react';
import { 
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow,
    IconButton,
    Tooltip,
    CircularProgress
} from '@mui/material';
import { ArrowDropUp, ArrowDropDown, Refresh } from '@mui/icons-material';
import { api } from '../services/api';
import { yahooFinanceService, StockPrice } from '../services/yahooFinance';
import { Stock } from '../types';



export const StockList: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [prices, setPrices] = useState<Record<string, StockPrice>>({});
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date>();

    const fetchStocks = async () => {
        const response = await api.getStocks();
        console.log(response.data); // Check what is being returned
        setStocks(response.data);
        return response.data;
    };

    const updatePrices = async (stocksList: Stock[]) => {
        setLoading(true);
        try {
            const symbols = stocksList.map(stock => stock.symbol);
            const newPrices = await yahooFinanceService.getBulkStockPrices(symbols);
            setPrices(newPrices);
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Error updating prices:', error);
        } finally {
            setLoading(false);
        }
    };

    // Initialize data
    useEffect(() => {
        const initialize = async () => {
            const stocksList = await fetchStocks();
            await updatePrices(stocksList);
        };
        initialize();
    }, []); // This effect runs only once on mount

    // Set up auto-refresh
    useEffect(() => {
        if (stocks.length === 0) return;

        const intervalId = setInterval(() => {
            updatePrices(stocks);
        }, 60000);

        return () => clearInterval(intervalId);
    }, [stocks]); // Now properly depending on stocks

    const handleManualRefresh = async () => {
        await updatePrices(stocks);
    };

    const formatPrice = (price: number) => price.toFixed(2);
    const formatChange = (change: number) => change.toFixed(2);
    const formatPercent = (percent: number) => percent.toFixed(2);

    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Stocks</h3>
                <div>
                    {lastUpdated && (
                        <span style={{ marginRight: '1rem', fontSize: '0.9rem', color: 'gray' }}>
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <Tooltip title="Refresh prices">
                        <IconButton onClick={handleManualRefresh} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : <Refresh />}
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Company Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Change</TableCell>
                        <TableCell align="right">Change %</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((stock) => {
                        const price = prices[stock.symbol];
                        return (
                            <TableRow key={stock.symbol}>
                                <TableCell>{stock.symbol}</TableCell>
                                <TableCell>{stock.company_name}</TableCell>
                                <TableCell align="right">
                                    {price ? `${formatPrice(price.regularMarketPrice)}` : '-'}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    sx={{ 
                                        color: price?.change >= 0 ? 'success.main' : 'error.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    {price ? (
                                        <>
                                            {price.change >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
                                            ${formatChange(Math.abs(price.change))}
                                        </>
                                    ) : '-'}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    sx={{ color: price?.changePercent >= 0 ? 'success.main' : 'error.main' }}
                                >
                                    {price ? `${formatPercent(price.changePercent)}%` : '-'}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
};