import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import CustomerList from './components/Customer/List';
import ProductList from './components/Product/List';
import StoreList from './components/Store/List';
import SaleList from './components/Sale/List';

function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CustomerList />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/stores" element={<StoreList />} />
                    <Route path="/sales" element={<SaleList />} />
                </Routes>
            </BrowserRouter>
        </>
    );

}

export default App;