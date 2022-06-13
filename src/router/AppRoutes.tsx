import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Cart } from '../components/cart/Cart';
import Messenger from '../components/chat/Messenger';
import Checkout from '../components/checkout/Checkout';
import CreateProduct from '../components/create-product/CreateProduct';
import { DisplayProducts } from "../components/display-products/DisplayProducts";
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import UpdateProduct from '../components/update-product/UpdateProduct';

export const AppRoutes: React.FC<unknown> = () => (
  <Routes>
    <Route path="/" element={<DisplayProducts />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/update/:id" element={<UpdateProduct/>} />
    <Route path="/create" element={<CreateProduct/>} />
    <Route path="/messenger" element={<Messenger/>} />
  </Routes>
)