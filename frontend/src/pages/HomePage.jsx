import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const categories = [
  { name: 'Electronics', icon: '🔌', color: '#6C63FF' },
  { name: 'Fashion', icon: '👗', color: '#FF6584' },
  { name: 'Accessories', icon: '⌚', color: '#f39c12' },
  { name: 'Home', icon: '🏠', color: '#2ecc71' },
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await getProducts();
        const sorted = [...data].sort((a, b) => b.rating - a.rating).slice(0, 4);
        setFeaturedProducts(sorted);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Discover Your Style</h1>
          <p>Shop the latest trends with premium quality products at unbeatable prices</p>
          <Link to="/products" className="btn btn-primary hero-btn">
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Our top-rated picks just for you</p>
          </div>
          {loading ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="section-cta">
            <Link to="/products" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find exactly what you&apos;re looking for</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className="category-card"
                style={{ '--cat-color': cat.color }}
              >
                <span className="category-icon">{cat.icon}</span>
                <h3>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay in the Loop</h2>
            <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
