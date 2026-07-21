import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <h2>Order Placed</h2>
      <p>Thank you! Your order has been received and is being processed.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default OrderSuccess;
