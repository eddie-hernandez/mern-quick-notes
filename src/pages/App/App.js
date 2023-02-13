import React, { useState } from 'react'
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-services';

export default function App() {
const [user, setUser] = useState(getUser())

let resPromise = fetch('https://jsonplaceholder.typicode.com/users')

  resPromise
    .then(res => res.json())
    .then(res => console.log(res))

  return (
    <main className="App">
      {
        user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes> 
        </>
        ) : (
          <AuthPage setUser={setUser} user={user} />
        )}
    </main>
  );
}