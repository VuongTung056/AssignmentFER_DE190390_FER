import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { fetchProductById, addProduct, updateProduct } from '../../store/slices/productsSlice';
import { toast } from 'react-toastify';

const ProductEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(s => s.products.items.find(i => i.id === id));
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (id && !product) dispatch(fetchProductById(id));
  }, [id]);

  const handleSave = async (values) => {
    setLoading(true);
    try {
      if (id) {
        const res = await dispatch(updateProduct({ id, ...values }));
        if (res.payload) toast.success('Product updated');
      } else {
        const res = await dispatch(addProduct({ id: Date.now().toString(), ...values }));
        if (res.payload) toast.success('Product added');
      }
      navigate('/admin/products');
    } catch (e) {
      toast.error('Save failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="admin-product-edit">
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <ProductForm onSubmit={handleSave} defaultValues={product || {}} />
    </div>
  );
};

export default ProductEditPage;
