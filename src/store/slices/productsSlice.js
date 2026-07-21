import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const PRODUCTS_URL = '/products';

export const fetchProducts = createAsyncThunk('products/fetch', async (params = '', { rejectWithValue }) => {
  try {
    // params may include query string handled by caller
    const res = await api.get(`${PRODUCTS_URL}${params}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`${PRODUCTS_URL}/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const addProduct = createAsyncThunk('products/add', async (product, { rejectWithValue }) => {
  try {
    const res = await api.post(PRODUCTS_URL, product);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateProduct = createAsyncThunk('products/update', async (product, { rejectWithValue }) => {
  try {
    const res = await api.put(`${PRODUCTS_URL}/${product.id}`, product);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`${PRODUCTS_URL}/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchProductById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.current = action.payload; })
      .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(addProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addProduct.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); })
      .addCase(addProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
        state.current = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteProduct.fulfilled, (state, action) => { state.loading = false; state.items = state.items.filter(i => i.id !== action.payload); })
      .addCase(deleteProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearCurrent, clearError } = productsSlice.actions;
// Backwards-compatible action names
export const clearCurrentProduct = clearCurrent;
export default productsSlice.reducer;
