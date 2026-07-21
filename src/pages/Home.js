import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/laptop1.png';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopMate</h1>
          <p>Discover curated laptops and deals updated daily. Fast shipping—best prices.</p>
          <div className="hero-cta">
            <Link to="/products" className="btn-hero">Browse Products</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="hero" />
        </div>
      </section>

      <section className="features">
        <h2>Why ShopMate?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Quality</h3>
            <p>Hand-picked laptops from trusted brands.</p>
          </div>
          <div className="feature-card">
            <h3>Great Prices</h3>
            <p>Competitive pricing with regular promotions.</p>
          </div>
          <div className="feature-card">
            <h3>Support</h3>
            <p>Fast customer support when you need it.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
