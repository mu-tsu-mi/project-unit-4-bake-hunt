import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import ProductDetailsPage from '../ProductDetailsPage/ProductDetailsPage';
import OrdersPage from '../OrdersPage/OrdersPage';
import CartPage from '../CartPage/CartPage';
import CakeListPage from '../CakeListPage/CakeListPage'
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<CakeListPage />} />
              <Route path="/cakes" element={<CakeListPage />} />
              <Route path="/cakes/:cakeNickname" element={<ProductDetailsPage user={user} />} />
              <Route path="/cart" element={<CartPage user={user} />} />
              <Route path="/orders" element={<OrdersPage user={user} />} />
              <Route path="/login" element={<AuthPage setUser={setUser} />} />
            </Routes>
          </>
    </main>
  );
}
