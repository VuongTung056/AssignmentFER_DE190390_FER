import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">
          <Link to="/">ShopMate</Link>
        </div>
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
