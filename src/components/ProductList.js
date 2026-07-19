import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, addProduct, deleteProduct } from '../store/productSlice';

// Import images statically for Webpack compilation
import laptop1 from '../assets/laptop1.png';
import laptop2 from '../assets/laptop2.jpg';
import laptop3 from '../assets/laptop3.png';
import laptop4 from '../assets/laptop4.png';
import laptop5 from '../assets/laptop5.jpg';
import laptop6 from '../assets/laptop6.png';
import laptop7 from '../assets/laptop7.jpg';
import laptop8 from '../assets/laptop8.jpg';
import laptop9 from '../assets/laptop9.png';
import laptop10 from '../assets/laptop10.png';

const imageMap = {
  'laptop1.png': laptop1,
  'laptop2.jpg': laptop2,
  'laptop3.png': laptop3,
  'laptop4.png': laptop4,
  'laptop5.jpg': laptop5,
  'laptop6.png': laptop6,
  'laptop7.jpg': laptop7,
  'laptop8.jpg': laptop8,
  'laptop9.png': laptop9,
  'laptop10.png': laptop10,
};

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading, error } = useSelector((state) => state.products);

  // Tab state: 'showcase' (Grid view) or 'manage' (Table view + Add form)
  const [activeTab, setActiveTab] = useState('showcase');

  // Form states for adding new product
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
  });

  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price, currentPrice } = formData;

    if (!name || !description || !price || !currentPrice) {
      setFormError('Please fill in all fields.');
      return;
    }

    setFormError('');

    // Generate unique id and assign default laptop1.png image
    const newProduct = {
      id: Date.now().toString(),
      name,
      description,
      price,
      currentPrice,
      image: 'laptop1.png',
    };

    dispatch(addProduct(newProduct))
      .unwrap()
      .then(() => {
        setFormData({
          name: '',
          description: '',
          price: '',
          currentPrice: '',
        });
      })
      .catch((err) => {
        setFormError(err || 'Failed to add product');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="product-list-page">
      {/* Navigation tabs at the top */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'showcase' ? 'active' : ''}`}
          onClick={() => setActiveTab('showcase')}
        >
          Showcase (Card Grid)
        </button>
        <button
          className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          Management (Table View)
        </button>
      </div>

      {error && <div className="error-banner">Error: {error}</div>}

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'showcase' ? (
        <div className="showcase-container">
          <div className="section-header">
            <h2>Product List</h2>
          </div>
          {loading && products.length === 0 ? (
            <div className="loading-spinner">Loading showcase...</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => {
                const imageSrc = imageMap[product.image] || laptop1;
                return (
                  <div className="product-card" key={product.id}>
                    <div className="card-image-container">
                      <img src={imageSrc} alt={product.name} className="card-image" />
                    </div>
                    <div className="card-content">
                      <h4 className="card-title">{product.name}</h4>
                      <p className="card-desc">{product.description}</p>
                      <div className="card-price-section">
                        <div className="card-original-price">{product.price} đ</div>
                        <div className="card-current-price">{product.currentPrice} đ</div>
                      </div>
                      <button
                        className="btn-view-details"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
              {products.length === 0 && (
                <div className="no-products">No products found.</div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="management-container">
          {/* Add Product Form at the Top */}
          <div className="add-product-container">
            <div className="section-header">
              <h2>Add Product</h2>
            </div>
            {formError && <div className="error-banner">{formError}</div>}
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 25.990.000"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="currentPrice">Current Price:</label>
                <input
                  type="text"
                  id="currentPrice"
                  name="currentPrice"
                  value={formData.currentPrice}
                  onChange={handleChange}
                  placeholder="e.g. 20.990.000"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Add Product
                </button>
              </div>
            </form>
          </div>

          {/* Product List Table below it */}
          <div className="table-container-section">
            <div className="section-header">
              <h2>Product List</h2>
            </div>
            {loading && products.length === 0 ? (
              <div className="loading-spinner">Loading table...</div>
            ) : (
              <div className="table-responsive">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th style={{ width: '5%' }}>#</th>
                      <th style={{ width: '25%' }}>Name</th>
                      <th style={{ width: '45%' }}>Description</th>
                      <th style={{ width: '8%' }}>Price</th>
                      <th style={{ width: '8%' }}>Current Price</th>
                      <th style={{ width: '9%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td className="center-text">{index + 1}</td>
                        <td>
                          <Link to={`/product/${product.id}`} className="product-link">
                            {product.name}
                          </Link>
                        </td>
                        <td>{product.description}</td>
                        <td className="center-text">
                          <div className="price-container">
                            <span className="original-price">{product.price}</span>
                            <span className="currency-symbol">đ</span>
                          </div>
                        </td>
                        <td className="center-text">
                          <div className="price-container">
                            <span className="current-price">{product.currentPrice}</span>
                            <span className="currency-symbol">đ</span>
                          </div>
                        </td>
                        <td className="center-text">
                          <div className="action-container">
                            <button
                              className="btn-action btn-delete"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn-action btn-edit"
                              onClick={() => navigate(`/product/${product.id}/edit`)}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" className="center-text no-products">
                          No products found. Add one above!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
