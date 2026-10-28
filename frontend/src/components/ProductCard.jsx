import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const {
    _id,
    name = '',
    price = 0,
    category = '',
    image = '',
    rating = 0,
    numReviews = 0,
    stock = 0,
  } = product;

  const isOutOfStock = stock === 0;
  const numRating = Number(rating) || 0;
  const roundedRating = Math.round(numRating);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || isAdded) return;

    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>{i < roundedRating ? '★' : '☆'}</span>
    ));
  };

  return (
    <div className="product-card">
      <Link to={`/products/${_id}`} className="product-card-link">
        <div className="product-card-image">
          {category && <span className="category-badge">{category}</span>}
          {isOutOfStock && <span className="stock-badge">Out of Stock</span>}

          {!imgError && image ? (
            <img
              src={image}
              alt={name}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="image-fallback" aria-label={name}>
              <span>🛍️</span>
            </div>
          )}
        </div>

        <div className="product-card-content">
          <h3 className="product-card-name" title={name}>
            {name}
          </h3>
          <div className="product-card-rating">
            <span className="stars" aria-label={`${numRating} out of 5 stars`}>
              {renderStars()}
            </span>
            <span className="rating-count">
              {numRating.toFixed(1)} ({numReviews})
            </span>
          </div>
          <div className="product-card-price">${Number(price).toFixed(2)}</div>
        </div>
      </Link>

      <div className="product-card-actions">
        <button
          type="button"
          className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={isOutOfStock ? `${name} is out of stock` : `Add ${name} to cart`}
        >
          {isOutOfStock ? 'Out of Stock' : isAdded ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
