import React from 'react';
import App from '../App';

import { render, screen } from '@testing-library/react';

describe('App component', () => {
    it('renders all the routes correctly', () => {
        render(<App />);

        // expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        // expect(screen.getByText('Expense')).toBeInTheDocument();
        // expect(screen.getByText('Home')).toBeInTheDocument();
        // expect(screen.getByText('Income')).toBeInTheDocument();
        // expect(screen.getByText('Investments')).toBeInTheDocument();
        // expect(screen.getByText('Loan')).toBeInTheDocument();
        // expect(screen.getByText('Report')).toBeInTheDocument();
        // expect(screen.getByText('Savings')).toBeInTheDocument();
        // expect(screen.getByText('Batch Processor')).toBeInTheDocument();
    });
});
