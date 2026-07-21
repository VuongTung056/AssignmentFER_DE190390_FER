import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../store/slices/productsSlice';
import { clearError } from '../store/slices/productsSlice';

const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
    image: '',
  });

  const [formError, setFormError] = useState('');

  // Fetch product data if it's not already in the state or doesn't match the current ID
  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(clearError());
  }, [dispatch, id]);

  // Set form data when product is loaded
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        currentPrice: product.currentPrice || '',
        image: product.image || 'laptop1.png',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price, currentPrice, image } = formData;

    if (!name || !description || !price || !currentPrice) {
      setFormError('Please fill in all fields.');
      return;
    }

    setFormError('');

    const updatedProduct = {
      id,
      name,
      description,
      price,
      currentPrice,
      image,
    };

    dispatch(updateProduct(updatedProduct))
      .unwrap()
      .then(() => {
        // Navigate back to the product details page
        navigate(`/product/${id}`);
      })
      .catch((err) => {
        setFormError(err || 'Failed to update product details');
      });
  };

  if (loading && !product) {
    return <div className="loading-spinner">Loading product...</div>;
  }

  return (
    <div className="product-edit-container">
      {/* Edit Product Heading */}
      <div className="section-header">
        <h2>Edit Product</h2>
      </div>

      {(error || formError) && (
        <div className="error-banner">
          Error: {formError || error}
        </div>
      )}

      {/* Edit Form */}
      <div className="edit-form-card">
        <form onSubmit={handleSubmit} className="product-edit-form">
          <div className="edit-form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product Description"
              rows="4"
              required
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (e.g. 25.990.000)"
              required
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="currentPrice">Current Price:</label>
            <input
              type="text"
              id="currentPrice"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              placeholder="Current Price (e.g. 20.990.000)"
              required
            />
          </div>

          <div className="edit-form-actions">
            <button
              type="button"
              className="btn-back-home-edit"
              onClick={() => navigate('/')}
            >
              Back Home
            </button>
            <button type="submit" className="btn-save-product">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
