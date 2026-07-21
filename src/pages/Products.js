import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../store/slices/productsSlice';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(s => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Products</h2>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
