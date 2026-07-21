import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} ShopMate. All rights reserved.</div>
        <div className="footer-links">Built with ❤️</div>
      </div>
    </footer>
  );
};

export default Footer;
