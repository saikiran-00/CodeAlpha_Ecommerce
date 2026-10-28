import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const renderStars = (rating) => {
    const filled = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < filled ? 'star filled' : 'star'}>
        {i < filled ? '★' : '☆'}
      </span>
    ));
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner" /></div>;
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <span className="not-found-icon">😕</span>
          <h2>Product Not Found</h2>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="product-detail">
          <div className="product-detail-image">
            {imgError ? (
              <div className="image-fallback-large">📦</div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImgError(true)}
              />
            )}
          </div>

          <div className="product-detail-info">
            <span className="detail-category">{product.category}</span>
            <h1>{product.name}</h1>

            <div className="detail-rating">
              <span className="stars">{renderStars(product.rating)}</span>
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">({product.numReviews} reviews)</span>
            </div>

            <p className="detail-price">${product.price.toFixed(2)}</p>

            <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✕ Out of Stock'}
            </div>

            <p className="detail-description">{product.description}</p>

            {product.stock > 0 && (
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
                </div>
              </div>
            )}

            <button
              className={`btn btn-primary add-to-cart-lg ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {added ? '✓ Added to Cart!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
