import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const CATS_URL = '/categories';

export const fetchCategories = createAsyncThunk('categories/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(CATS_URL);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const addCategory = createAsyncThunk('categories/add', async (cat, { rejectWithValue }) => {
  try {
    const res = await api.post(CATS_URL, cat);
    return res.data;
  } catch (err) { return rejectWithValue(err.response?.data || err.message); }
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`${CATS_URL}/${id}`);
    return id;
  } catch (err) { return rejectWithValue(err.response?.data || err.message); }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addCategory.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteCategory.fulfilled, (state, action) => { state.items = state.items.filter(i => i.id !== action.payload); });
  }
});

export default categoriesSlice.reducer;
