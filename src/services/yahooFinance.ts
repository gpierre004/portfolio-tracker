// frontend/src/services/yahooFinance.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export interface StockPrice {
  regularMarketPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
}

export const yahooFinanceService = {
  getStockPrice: async (symbol: string): Promise<StockPrice> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/yahoo-finance/${symbol}`);
      const quote = response.data.chart.result[0].meta;
      
      return {
        regularMarketPrice: quote.regularMarketPrice,
        previousClose: quote.previousClose,
        change: quote.regularMarketPrice - quote.previousClose,
        changePercent: ((quote.regularMarketPrice - quote.previousClose) / quote.previousClose) * 100
      };
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      throw error;
    }
  },

  getBulkStockPrices: async (symbols: string[]): Promise<Record<string, StockPrice>> => {
    try {
      const promises = symbols.map(symbol => yahooFinanceService.getStockPrice(symbol));
      const results = await Promise.all(promises);
      return symbols.reduce((acc, symbol, index) => {
        acc[symbol] = results[index];
        return acc;
      }, {} as Record<string, StockPrice>);
    } catch (error) {
      console.error('Error fetching bulk prices:', error);
      throw error;
    }
  }
};