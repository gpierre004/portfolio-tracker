// frontend/src/types/index.ts
export interface Stock {
    symbol: string;
    company_name: string;
    current_price: number | null;
}

export interface Transaction {
    id?: number;
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    date?: string; // Make date optional since it's generated on the server
}

export interface PortfolioItem {
    symbol: string;
    company_name: string;
    current_price: number;
    shares_owned: number;
    total_investment: number;
}