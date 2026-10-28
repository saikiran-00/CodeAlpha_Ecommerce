import { Link } from 'react-router-dom';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  return (
    <div className="order-success-page">
      <div className="success-content">
        <div className="success-checkmark">
          <span>✓</span>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for shopping with Shopora. Your order is being processed and you&apos;ll receive updates soon.</p>
        <div className="success-actions">
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
          <Link to="/orders" className="btn btn-outline">View My Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
