import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../store/slices/ordersSlice';
import { clearCart } from '../store/slices/cartSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  paymentMethod: yup.string().required('Select payment method')
}).required();

const Checkout = () => {
  const items = useSelector(s => s.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (items.length === 0) {
      toast.info('Your cart is empty');
      return;
    }
    setLoading(true);
    const order = {
      items: items.map(i => ({ productId: i.productId, name: i.name, price: i.price, qty: i.qty })),
      customer: { name: data.name, phone: data.phone, address: data.address },
      paymentMethod: data.paymentMethod,
      total: items.reduce((s,i)=>s+(i.price||0)*i.qty,0),
      createdAt: new Date().toISOString()
    };

    const res = await dispatch(placeOrder(order));
    setLoading(false);
    if (res.payload) {
      dispatch(clearCart());
      toast.success('Order placed');
      navigate('/order-success');
    } else {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {items.length === 0 ? <div>Your cart is empty.</div> : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <input {...register('name')} />
            <div className="error-text">{errors.name?.message}</div>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input {...register('phone')} />
            <div className="error-text">{errors.phone?.message}</div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input {...register('address')} />
            <div className="error-text">{errors.address?.message}</div>
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select {...register('paymentMethod')}>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Card Payment</option>
            </select>
            <div className="error-text">{errors.paymentMethod?.message}</div>
          </div>

          <div className="form-actions"><button type="submit" disabled={loading}>{loading? 'Placing...':'Place Order'}</button></div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
