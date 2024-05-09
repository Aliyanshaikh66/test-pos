import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Bills from '../pages/Bills';
import Customer from '../pages/Customer';
import Items from '../pages/Items';
import Cart from '../pages/Cart';

export default function FileRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
           
        </Routes>
    )
}
