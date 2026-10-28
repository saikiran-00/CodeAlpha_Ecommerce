import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && cartItems.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cartItems, isAuthenticated, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    const { fullName, phone, address, city, state, zipCode } = formData;
    if (!fullName.trim()) return 'Full name is required';
    if (!phone.trim()) return 'Phone number is required';
    if (!address.trim()) return 'Delivery address is required';
    if (!city.trim()) return 'City is required';
    if (!state.trim()) return 'State is required';
    if (!zipCode.trim()) return 'ZIP code is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        deliveryInfo: {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          zipCode: formData.zipCode.trim(),
        },
      };
      await createOrder(orderData);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return <div className="loading-spinner"><div className="spinner" /></div>;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="page-header">
          <h1>Checkout</h1>
          <p>Complete your order</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form">
            <h2>Delivery Information</h2>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main Street, Apt 4B" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="New York" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} placeholder="NY" />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="10001" />
              </div>
            </div>

            <div className="payment-method">
              <h3>Payment Method</h3>
              <div className="payment-option">
                <span className="payment-radio">●</span>
                <span>💵 Cash on Delivery</span>
              </div>
            </div>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="checkout-items">
              {cartItems.map(({ product, quantity }) => (
                <div key={product._id} className="checkout-item">
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{product.name}</span>
                    <span className="checkout-item-qty">x{quantity}</span>
                  </div>
                  <span className="checkout-item-price">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">Free</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <button type="submit" className="btn btn-primary place-order-btn" disabled={submitting}>
              {submitting ? 'Placing Order...' : 'Place Order'}
            </button>

            <Link to="/cart" className="back-to-cart">← Back to Cart</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
