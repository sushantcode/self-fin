import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Expense from './components/pages/expense/Expense';
import Home from './components/pages/home/Home';
import Income from './components/pages/income/Income';
import Investments from './components/pages/investments/Investments';
import Loan from './components/pages/loan/Loan';
import Report from './components/pages/report/Report';
import Savings from './components/pages/savings/Savings';
import Titlebar from './components/titlebar/Titlebar';
import BatchProcessor from './components/pages/batch_processor/BatchProcessor';

function App() {
    return (
        <Router>
            <Titlebar />
            <Container>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/loan" element={<Loan />} />
                    <Route path="/savings" element={<Savings />} />
                    <Route path="/investments" element={<Investments />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/batchProcessor" element={<BatchProcessor />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
