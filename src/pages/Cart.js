import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQty, removeFromCart, clearCart } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items || []);

  const total = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div>No items in cart.</div>
      ) : (
        <div>
          <table className="product-table">
            <thead>
              <tr><th>#</th><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th>Action</th></tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.productId}>
                  <td className="center-text">{idx+1}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      {it.image && <img src={require(`../assets/${it.image}`)} alt={it.name} style={{width:64}} />}
                      <div>{it.name}</div>
                    </div>
                  </td>
                  <td className="center-text">{(it.price||0).toLocaleString('vi-VN')} đ</td>
                  <td className="center-text">
                    <input type="number" value={it.qty} min="1" onChange={(e)=>dispatch(updateQty({productId:it.productId, qty: Number(e.target.value)}))} style={{width:68}} />
                  </td>
                  <td className="center-text">{((it.price||0)*it.qty).toLocaleString('vi-VN')} đ</td>
                  <td className="center-text"><button onClick={()=>dispatch(removeFromCart(it.productId))}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
            <div><strong>Total:</strong> {(total).toLocaleString('vi-VN')} đ</div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>dispatch(clearCart())}>Clear</button>
              <button onClick={()=>window.location.href='/checkout'}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
