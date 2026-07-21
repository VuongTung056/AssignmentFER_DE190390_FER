import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../store/slices/productsSlice';
import { Link, useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector(s => s.products);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeleting(id);
    await dispatch(deleteProduct(id));
    setDeleting(null);
  };

  return (
    <div className="admin-products">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Products</h2>
        <div>
          <Link to="/admin/products/new" className="btn-hero">Add Product</Link>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <table className="product-table">
          <thead><tr><th>#</th><th>Name</th><th>Brand</th><th>Price</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((p, idx) => (
              <tr key={p.id}>
                <td className="center-text">{idx+1}</td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td className="center-text">{String(p.currentPrice)}</td>
                <td className="center-text">
                  <button onClick={() => navigate(`/admin/products/${p.id}/edit`)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} disabled={deleting===p.id}>{deleting===p.id? 'Deleting...':'Delete'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsList;
