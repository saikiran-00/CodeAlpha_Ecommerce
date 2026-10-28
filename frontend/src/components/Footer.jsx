import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Information */}
        <div className="footer-brand">
          <h3>Shopora</h3>
          <p>
            Your premium destination for quality products. We curate the finest
            selection for the modern shopper.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orders">My Orders</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>
              <Link to="/products?category=Electronics">Electronics</Link>
            </li>
            <li>
              <Link to="/products?category=Fashion">Fashion</Link>
            </li>
            <li>
              <Link to="/products?category=Accessories">Accessories</Link>
            </li>
            <li>
              <Link to="/products?category=Home">Home</Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <span>📧</span>
              <span>support@shopora.com</span>
            </li>
            <li>
              <span>📞</span>
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <span>📍</span>
              <span>123 Commerce St, Tech City</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2024 Shopora. All rights reserved.</p>
        <div className="footer-social">
          <span role="img" aria-label="Facebook">📘</span>
          <span role="img" aria-label="Twitter">🐦</span>
          <span role="img" aria-label="Instagram">📸</span>
          <span role="img" aria-label="LinkedIn">💼</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
