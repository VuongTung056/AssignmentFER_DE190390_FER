import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/ordersSlice';

const OrdersList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(s => s.orders);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h3>Orders</h3>
      <table className="product-table">
        <thead><tr><th>ID</th><th>Customer</th><th>Total</th></tr></thead>
        <tbody>
          {items.map(o => (
            <tr key={o.id}><td>{o.id}</td><td>{o.customer?.name}</td><td>{o.total}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
