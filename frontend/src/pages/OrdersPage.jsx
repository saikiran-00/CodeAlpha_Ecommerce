import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../services/api';
import './OrdersPage.css';

const statusColors = {
  Processing: '#f39c12',
  Confirmed: '#3498db',
  Shipped: '#9b59b6',
  Delivered: '#2ecc71',
  Cancelled: '#e74c3c',
};

const OrdersPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        const { data } = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || loading) {
    return <div className="loading-spinner"><div className="spinner" /></div>;
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>My Orders</h1>
          <p>Track and manage your orders</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {orders.length === 0 ? (
          <div className="no-orders">
            <span className="no-orders-icon">📦</span>
            <h3>No orders yet</h3>
            <p>You haven&apos;t placed any orders yet.</p>
            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div
                  className="order-header"
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                >
                  <div className="order-info">
                    <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-meta">
                    <span
                      className="order-status"
                      style={{ background: `${statusColors[order.status]}15`, color: statusColors[order.status] }}
                    >
                      {order.status}
                    </span>
                    <span className="order-total">${order.totalAmount.toFixed(2)}</span>
                    <span className="order-toggle">{expandedOrder === order._id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expandedOrder === order._id && (
                  <div className="order-details">
                    <div className="order-items-list">
                      <h4>Items ({order.items.length})</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-detail-item">
                          <span className="odi-name">{item.name}</span>
                          <span className="odi-qty">x{item.quantity}</span>
                          <span className="odi-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-delivery">
                      <h4>Delivery Details</h4>
                      <p>{order.deliveryInfo.fullName}</p>
                      <p>{order.deliveryInfo.phone}</p>
                      <p>{order.deliveryInfo.address}</p>
                      <p>{order.deliveryInfo.city}, {order.deliveryInfo.state} {order.deliveryInfo.zipCode}</p>
                    </div>
                    <div className="order-payment">
                      <span>Payment: {order.paymentMethod}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
