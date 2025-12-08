import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import StorePage from './pages/StorePage.jsx';
import AllDiscountsPage from './pages/all.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import AccountPage from './pages/Account.jsx';
import CouponsPage from './pages/Coupons.jsx';
import PopularDiscountsPage from './pages/PopularDiscounts.jsx';
import NewDiscountsPage from './pages/NewDiscounts.jsx';
import JooponExclusivePage from './pages/JooponExclusive.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/coupons" element={<CouponsPage />} />
        <Route path="/all-discounts" element={<AllDiscountsPage />} />
        <Route path="/popular-discounts" element={<PopularDiscountsPage />} />
        <Route path="/new-discounts" element={<NewDiscountsPage />} />
        <Route path="/joopon-exclusive" element={<JooponExclusivePage />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/:storeName" element={<StorePage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);