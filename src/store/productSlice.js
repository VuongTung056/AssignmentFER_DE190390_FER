// Backwards-compatible shim: re-export specific actions and default reducer
import productsReducer, { clearCurrent, clearError, clearCurrentProduct } from './slices/productsSlice';

export { fetchProducts, fetchProductById, addProduct, updateProduct, deleteProduct } from './slices/productsSlice';
export { clearCurrentProduct, clearError };
export default productsReducer;
