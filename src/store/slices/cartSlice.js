import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};

const initialState = {
  items: loadCart(), // {productId, name, price, qty, image}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.productId === item.productId);
      if (existing) {
        existing.qty += item.qty || 1;
      } else {
        state.items.push({ ...item, qty: item.qty || 1 });
      }
      try { localStorage.setItem('cart', JSON.stringify(state.items)); } catch(e){}
    },
    updateQty(state, action) {
      const { productId, qty } = action.payload;
      const existing = state.items.find(i => i.productId === productId);
      if (existing) existing.qty = Math.max(1, qty);
      try { localStorage.setItem('cart', JSON.stringify(state.items)); } catch(e){}
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.productId !== action.payload);
      try { localStorage.setItem('cart', JSON.stringify(state.items)); } catch(e){}
    },
    clearCart(state) {
      state.items = [];
      try { localStorage.removeItem('cart'); } catch(e){}
    }
  }
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
